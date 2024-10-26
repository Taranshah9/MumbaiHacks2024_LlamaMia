import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { cropType, soilType } from "../../../../data";

export default function FertilizerRecommend() {
  const [formData, setFormData] = useState({
    CropType: "",
    SoilType: "",
    Humidity: 51,
    Nitrogen: 8,
    Phosphorous: 28,
    Potassium: 12,
    SoilMoisture: 63,
    Temperature: 31,
  });
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nfc-api-l2z3.onrender.com/fert_predict",
        {
          "Crop Type": formData.CropType,
          "Soil Type": formData.SoilType,
          "Soil Moisture": formData.SoilMoisture,
          Humidity: formData.Humidity,
          Nitrogen: formData.Nitrogen,
          Phosphorous: formData.Phosphorous,
          Potassium: formData.Potassium,
        }
      );
      console.log(response.data);
      setRecommendation(response.data);
    } catch (error) {
      console.error("Error:", error);
      setRecommendation(
        "Failed to get fertilizer recommendation. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-lime-800 flex items-center justify-center gap-2">
            {/* <Seedling className="h-6 w-6 text-lime-600" /> */}
            Fertilizer Recommendation
          </CardTitle>
          <CardDescription className="text-center">
            Enter crop and soil details to get fertilizer recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="CropType">Crop Type</Label>
              <Select
                name="CropType"
                onValueChange={(value) => handleSelectChange("CropType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {cropType.map((item, index) => (
                    <SelectItem value={item} key={index}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="SoilType">Soil Type</Label>
              <Select
                name="SoilType"
                onValueChange={(value) => handleSelectChange("SoilType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilType.map((item, index) => (
                    <SelectItem value={item} key={index}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="Humidity">Humidity (%)</Label>
                <Input
                  id="Humidity"
                  name="Humidity"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.Humidity || ""}
                  placeholder="e.g., 51"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="Nitrogen">Nitrogen (kg/ha)</Label>
                <Input
                  id="Nitrogen"
                  name="Nitrogen"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.Nitrogen || ""}
                  placeholder="e.g., 8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="Phosphorous">Phosphorous (kg/ha)</Label>
                <Input
                  id="Phosphorous"
                  name="Phosphorous"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.Phosphorous || ""}
                  placeholder="e.g., 28"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="Potassium">Potassium (kg/ha)</Label>
                <Input
                  id="Potassium"
                  name="Potassium"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.Potassium || ""}
                  placeholder="e.g., 12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="SoilMoisture">Soil Moisture (%)</Label>
                <Input
                  id="SoilMoisture"
                  name="SoilMoisture"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.SoilMoisture || ""}
                  placeholder="e.g., 63"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="Temperature">Temperature (°C)</Label>
                <Input
                  id="Temperature"
                  name="Temperature"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.Temperature || ""}
                  placeholder="e.g., 31"
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Get Recommendation"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          {recommendation && (
            <div>
              <div className="text-center">
                <h3 className="font-semibold text-lg text-lime-700">
                  Description:
                </h3>
                <p className="text-xl font-bold text-lime-900">
                  {recommendation.Description}
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg text-lime-700">
                  Recommended Fertilizer:
                </h3>
                <p className="text-xl font-bold text-lime-900">
                  {recommendation["Fertilizer Name"]}
                </p>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
