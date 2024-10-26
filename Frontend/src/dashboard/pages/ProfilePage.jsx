// File: src/components/FarmerProfile.jsx
import { useState } from 'react';
import { User, MapPin, Phone, Mail, Crop, Calendar, Package, Plus, Save, Edit2, Trash2, Camera } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FarmerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [farmerData, setFarmerData] = useState({
    name: "John Smith",
    profileImage: null,
    address: "123 Farm Road",
    location: {
      city: "Springfield",
      state: "IL",
      country: "USA"
    },
    contact: {
      phone: "+1 (555) 123-4567",
      email: "john.smith@farmmail.com"
    },
    farmDetails: {
      farmName: "Green Acres Farm",
      totalArea: "50 acres",
      established: "1985"
    },
    crops: [
      {
        name: "Corn",
        area: "20 acres",
        season: "Summer",
        expectedYield: "100 tons"
      }
    ]
  });

  const [editedData, setEditedData] = useState(farmerData);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditedData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (section, field, value) => {
    setEditedData(prev => {
      if (section === 'main') {
        return { ...prev, [field]: value };
      } else if (section === 'location' || section === 'contact') {
        return { ...prev, [section]: { ...prev[section], [field]: value } };
      } else if (section === 'farmDetails') {
        return { ...prev, farmDetails: { ...prev.farmDetails, [field]: value } };
      }
      return prev;
    });
  };

  const handleCropChange = (index, field, value) => {
    setEditedData(prev => {
      const newCrops = [...prev.crops];
      newCrops[index] = { ...newCrops[index], [field]: value };
      return { ...prev, crops: newCrops };
    });
  };

  const addNewCrop = () => {
    setEditedData(prev => ({
      ...prev,
      crops: [...prev.crops, { name: "", area: "", season: "", expectedYield: "" }]
    }));
  };

  const removeCrop = (index) => {
    setEditedData(prev => ({
      ...prev,
      crops: prev.crops.filter((_, i) => i !== index)
    }));
  };

  const saveChanges = () => {
    setFarmerData(editedData);
    setIsEditing(false);
  };

  const EditableField = ({ value, onChange, placeholder }) => (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full"
    />
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Edit Controls */}
      <div className="flex justify-end space-x-4">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700">
            <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
        ) : (
          <Button onClick={saveChanges} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        )}
      </div>

      {/* Header Section with Profile Image */}
      <div className="bg-green-50 rounded-lg p-6 shadow-lg">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-green-100 flex items-center justify-center">
              {(imagePreview || editedData.profileImage) ? (
                <img 
                  src={imagePreview || editedData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-green-600" />
              )}
            </div>
            {isEditing && (
              <div className="absolute bottom-0 right-0">
                <label htmlFor="profile-image" className="cursor-pointer">
                  <div className="bg-green-600 rounded-full p-2 hover:bg-green-700 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <>
                <EditableField
                  value={editedData.farmDetails.farmName}
                  onChange={(value) => handleInputChange('farmDetails', 'farmName', value)}
                  placeholder="Farm Name"
                />
                <EditableField
                  value={editedData.name}
                  onChange={(value) => handleInputChange('main', 'name', value)}
                  placeholder="Farmer Name"
                />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-green-800">{farmerData.farmDetails.farmName}</h1>
                <p className="text-green-600">Managed by {farmerData.name}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Address</label>
                  <EditableField
                    value={editedData.address}
                    onChange={(value) => handleInputChange('main', 'address', value)}
                    placeholder="Address"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">City</label>
                  <EditableField
                    value={editedData.location.city}
                    onChange={(value) => handleInputChange('location', 'city', value)}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Phone</label>
                  <EditableField
                    value={editedData.contact.phone}
                    onChange={(value) => handleInputChange('contact', 'phone', value)}
                    placeholder="Phone"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Email</label>
                  <EditableField
                    value={editedData.contact.email}
                    onChange={(value) => handleInputChange('contact', 'email', value)}
                    placeholder="Email"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <MapPin className="text-gray-500" />
                  <span>{farmerData.address}, {farmerData.location.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="text-gray-500" />
                  <span>{farmerData.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="text-gray-500" />
                  <span>{farmerData.contact.email}</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Farm Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Farm Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Total Area</label>
                  <EditableField
                    value={editedData.farmDetails.totalArea}
                    onChange={(value) => handleInputChange('farmDetails', 'totalArea', value)}
                    placeholder="Total Area"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Established Year</label>
                  <EditableField
                    value={editedData.farmDetails.established}
                    onChange={(value) => handleInputChange('farmDetails', 'established', value)}
                    placeholder="Established Year"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <Package className="text-gray-500" />
                  <span>Total Area: {farmerData.farmDetails.totalArea}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-gray-500" />
                  <span>Established: {farmerData.farmDetails.established}</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Crops Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Current Crops</CardTitle>
          {isEditing && (
            <Button onClick={addNewCrop} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" /> Add Crop
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(isEditing ? editedData : farmerData).crops.map((crop, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Crop {index + 1}</h3>
                      <Button
                        onClick={() => removeCrop(index)}
                        variant="destructive"
                        size="sm"
                        className="bg-red-500 hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <EditableField
                        value={crop.name}
                        onChange={(value) => handleCropChange(index, 'name', value)}
                        placeholder="Crop Name"
                      />
                      <EditableField
                        value={crop.area}
                        onChange={(value) => handleCropChange(index, 'area', value)}
                        placeholder="Area"
                      />
                      <EditableField
                        value={crop.season}
                        onChange={(value) => handleCropChange(index, 'season', value)}
                        placeholder="Growing Season"
                      />
                      <EditableField
                        value={crop.expectedYield}
                        onChange={(value) => handleCropChange(index, 'expectedYield', value)}
                        placeholder="Expected Yield"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-2 mb-2">
                      <Crop className="text-green-600" />
                      <h3 className="font-semibold">{crop.name}</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center">
                        <span className="w-32 text-gray-600">Area:</span>
                        {crop.area}
                      </p>
                      <p className="flex items-center">
                        <span className="w-32 text-gray-600">Growing Season:</span>
                        {crop.season}
                      </p>
                      <p className="flex items-center">
                        <span className="w-32 text-gray-600">Expected Yield:</span>
                        {crop.expectedYield}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerProfile;