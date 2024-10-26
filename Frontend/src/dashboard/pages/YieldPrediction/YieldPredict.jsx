import React, { useState } from "react";
import { Sprout, Loader2 } from "lucide-react";
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
import { district, season, crop } from "../../../../data";
import axios from "axios";

function YieldPredict() {
  const [formData, setFormData] = useState({
    Area: 100,
    District: "",
    Crop: "",
    Season: "",
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Area" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nfc-api-l2z3.onrender.com/crop_yield",
        formData
      );
      setPrediction(response.data["Predicted Crop Yield"]);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Failed to get yield prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800 flex items-center justify-center gap-2">
            <Sprout className="h-6 w-6 text-green-600" />
            Crop Yield Prediction
          </CardTitle>
          <CardDescription className="text-center">
            Enter crop and area details to predict yield
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="Area">Area (hectares)</Label>
                <Input
                  id="Area"
                  name="Area"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.Area || ""}
                  placeholder="e.g., 100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="District">District</Label>
                <Select
                  name="District"
                  onValueChange={(value) =>
                    handleSelectChange("District", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {district.map((item, index) => (
                      <SelectItem value={item} key={index}>
                        {item}
                      </SelectItem>
                    ))}
                    {/* Add more districts as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="Crop">Crop</Label>
                <Select
                  name="Crop"
                  onValueChange={(value) => handleSelectChange("Crop", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crop.map((item, index) => (
                      <SelectItem value={item} key={index}>
                        {item}
                      </SelectItem>
                    ))}
                    {/* Add more crops as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="Season">Season</Label>
                <Select
                  name="Season"
                  onValueChange={(value) => handleSelectChange("Season", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {season.map((item, index) => (
                      <SelectItem value={item} key={index}>
                        {item}
                      </SelectItem>
                    ))}
                    {/* Add more crops as needed */}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Predict Yield"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          {prediction !== null && (
            <div className="text-center">
              <h3 className="font-semibold text-lg text-green-700">
                Predicted Yield:
              </h3>
              <p className="text-xl font-bold text-green-900">
                {typeof prediction === "number"
                  ? `${prediction.toFixed(2)} tons`
                  : prediction}
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default YieldPredict;
