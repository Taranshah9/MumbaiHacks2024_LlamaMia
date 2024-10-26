import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from 'axios';

// List of districts (same as you provided)
const districts = [
  'NICOBARS', 'NORTH AND MIDDLE ANDAMAN', 'SOUTH ANDAMANS', 'ANANTAPUR', 'CHITTOOR', 'EAST GODAVARI', 
  'GUNTUR', 'KADAPA', 'KRISHNA', 'KURNOOL', 'PRAKASAM', 'SPSR NELLORE', 'SRIKAKULAM', 'VISAKHAPATANAM', 
  'VIZIANAGARAM', 'WEST GODAVARI', 'ANJAW', 'CHANGLANG', 'DIBANG VALLEY', 'EAST KAMENG', 'EAST SIANG', 
  'KURUNG KUMEY', 'LOHIT', 'LONGDING', 'LOWER DIBANG VALLEY', 'LOWER SUBANSIRI', 'NAMSAI', 'PAPUM PARE', 
  'TAWANG', 'TIRAP', 'UPPER SIANG', 'UPPER SUBANSIRI', 'WEST KAMENG', 'WEST SIANG', 'BAKSA', 'BARPETA', 
  'BONGAIGAON', 'CACHAR', 'CHIRANG', 'DARRANG', 'DHEMAJI', 'DHUBRI', 'DIBRUGARH', 'DIMA HASAO', 'GOALPARA', 
  'GOLAGHAT', 'HAILAKANDI', 'JORHAT', 'KAMRUP', 'KAMRUP METRO', 'KARBI ANGLONG', 'KARIMGANJ', 'KOKRAJHAR', 
  'LAKHIMPUR', 'MARIGAON', 'NAGAON', 'NALBARI', 'SIVASAGAR', 'SONITPUR', 'TINSUKIA', 'UDALGURI', 'ARARIA', 
  'ARWAL', 'AURANGABAD', 'BANKA', 'BEGUSARAI', 'BHAGALPUR', 'BHOJPUR', 'BUXAR', 'DARBHANGA', 'GAYA', 
  'GOPALGANJ', 'JAMUI', 'JEHANABAD', 'KAIMUR (BHABUA)', 'KATIHAR', 'KHAGARIA', 'KISHANGANJ', 'LAKHISARAI', 
  'MADHEPURA', 'MADHUBANI', 'MUNGER', 'MUZAFFARPUR', 'NALANDA', 'NAWADA', 'PASHCHIM CHAMPARAN', 'PATNA', 
  'PURBI CHAMPARAN', 'PURNIA', 'ROHTAS', 'SAHARSA', 'SAMASTIPUR', 'SARAN', 'SHEIKHPURA', 'SHEOHAR', 
  'SITAMARHI', 'SIWAN', 'SUPAUL', 'VAISHALI', 'CHANDIGARH', 'BALOD', 'BALODA BAZAR', 'BALRAMPUR', 'BASTAR', 
  'BEMETARA', 'BIJAPUR', 'BILASPUR', 'DANTEWADA', 'DHAMTARI', 'DURG', 'GARIYABAND', 'JANJGIR-CHAMPA', 
  'JASHPUR', 'KABIRDHAM', 'KANKER', 'KONDAGAON', 'KORBA', 'KOREA', 'MAHASAMUND', 'MUNGELI', 'NARAYANPUR', 
  'RAIGARH', 'RAIPUR', 'RAJNANDGAON', 'SUKMA', 'SURAJPUR', 'SURGUJA', 'DADRA AND NAGAR HAVELI', 'NORTH GOA', 
  'SOUTH GOA', 'AHMADABAD', 'AMRELI', 'ANAND', 'BANAS KANTHA', 'BHARUCH', 'BHAVNAGAR', 'DANG', 'DOHAD', 
  'GANDHINAGAR', 'JAMNAGAR', 'JUNAGADH', 'KACHCHH', 'KHEDA', 'MAHESANA', 'NARMADA', 'NAVSARI', 'PANCH MAHALS', 
  'PATAN', 'PORBANDAR', 'RAJKOT', 'SABAR KANTHA', 'SURAT', 'SURENDRANAGAR', 'TAPI', 'VADODARA', 'VALSAD', 
  'AMBALA', 'BHIWANI', 'FARIDABAD', 'FATEHABAD', 'GURGAON', 'HISAR', 'JHAJJAR', 'JIND', 'KAITHAL', 'KARNAL', 
  'KURUKSHETRA', 'MAHENDRAGARH', 'MEWAT', 'PALWAL', 'PANCHKULA', 'PANIPAT', 'REWARI', 'ROHTAK', 'SIRSA', 
  'SONIPAT', 'YAMUNANAGAR', 'CHAMBA', 'HAMIRPUR', 'KANGRA', 'KINNAUR', 'KULLU', 'LAHUL AND SPITI', 'MANDI', 
  'SHIMLA', 'SIRMAUR', 'SOLAN', 'UNA', 'ANANTNAG', 'BADGAM', 'BANDIPORA', 'BARAMULLA', 'DODA', 'GANDERBAL', 
  'JAMMU', 'KARGIL', 'KATHUA', 'KISHTWAR', 'KULGAM', 'KUPWARA', 'LEH LADAKH', 'POONCH', 'PULWAMA', 
  'RAJAURI', 'RAMBAN', 'REASI', 'SAMBA', 'SHOPIAN', 'SRINAGAR', 'UDHAMPUR', 'BOKARO', 'CHATRA', 'DEOGHAR', 
  'DHANBAD', 'DUMKA', 'EAST SINGHBUM', 'GARHWA', 'GIRIDIH', 'GODDA', 'GUMLA', 'HAZARIBAGH', 'JAMTARA', 
  'KHUNTI', 'KODERMA', 'LATEHAR', 'LOHARDAGA', 'PAKUR', 'PALAMU', 'RAMGARH', 'RANCHI', 'SAHEBGANJ', 
  'SARAIKELA KHARSAWAN', 'SIMDEGA', 'WEST SINGHBHUM', 'BAGALKOT', 'BANGALORE RURAL', 'BELGAUM', 'BELLARY', 
  'BENGALURU URBAN', 'BIDAR', 'CHAMARAJANAGAR', 'CHIKBALLAPUR', 'CHIKMAGALUR', 'CHITRADURGA', 'DAKSHIN KANNAD', 
  'DAVANGERE', 'DHARWAD', 'GADAG', 'GULBARGA', 'HASSAN', 'HAVERI', 'KODAGU', 'KOLAR', 'KOPPAL', 'MANDYA', 
  'MYSORE', 'RAICHUR', 'RAMANAGARA', 'SHIMOGA', 'TUMKUR', 'UDUPI', 'UTTAR KANNAD', 'YADGIR', 'ALAPPUZHA', 
  'ERNAKULAM', 'IDUKKI', 'KANNUR', 'KASARAGOD', 'KOLLAM', 'KOTTAYAM'
];

const crops = ['Bajra', 'Rice', 'Corn', 'Wheat', 'Maize']; // Add more crops as needed
const seasons = ['Kharif', 'Rabi', 'Zaid'];

export const CropSelectionForm = () => {
  const [district, setDistrict] = useState('');
  const [crop, setCrop] = useState('');
  const [season, setSeason] = useState('');
  const [land, setLand] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedAnswer('');

    try {
      const response = await axios.post('https://nfc-api-l2z3.onrender.com/crop_yield', {
        "Area": parseFloat(land),
        "District": district,
        "Crop": crop,
        "Season": season
      });

      const data = response.data;
      setGeneratedAnswer(`Based on your inputs (District: ${district}, Crop: ${crop}, Season: ${season}, Land: ${land} acres), 
        the predicted crop yield is ${data['Predicted Crop Yield']} for the year 2022.`);
    } catch (error) {
      console.error('API call error:', error);
      setError('Failed to fetch data from the API. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-4">
      <div className="w-full md:w-1/2 p-4">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Crop Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="district">Select District</Label>
                <Select value={district} onValueChange={setDistrict} required>
                  <SelectTrigger id="district">
                    <SelectValue placeholder="Choose a district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((dist, index) => (
                      <SelectItem key={index} value={dist}>{dist}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="season">Select Season</Label>
                <Select value={season} onValueChange={setSeason} required>
                  <SelectTrigger id="season">
                    <SelectValue placeholder="Choose a season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((s, index) => (
                      <SelectItem key={index} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crop">Select Crop</Label>
                <Select value={crop} onValueChange={setCrop} required>
                  <SelectTrigger id="crop">
                    <SelectValue placeholder="Choose a crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((c, index) => (
                      <SelectItem key={index} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="land">Enter Your Land (in acres)</Label>
                <Input
                  id="land"
                  type="number"
                  placeholder="e.g., 5.5"
                  value={land}
                  onChange={(e) => setLand(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Generating...' : 'Generate Recommendation'}
              </Button>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="w-full md:w-1/2 p-4 mt-4 md:mt-0">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedAnswer ? (
              <div className="bg-white p-4 rounded-md shadow">
                <p className="text-lg">{generatedAnswer}</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-lg">Your recommendation will appear here after submission.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};