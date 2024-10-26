"use client";

import React, { useState } from "react";
import { Leaf, Loader2 } from "lucide-react";
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
import axios from "axios";

export default function CropRecommend() {
  const [formData, setFormData] = useState({
    n: 0,
    p: 0,
    k: 0,
    temperature: 0,
    humidity: 0,
    ph: 0,
    rainfall: 0,
  });
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nfc-api-l2z3.onrender.com/crop_rec",
        formData
      );
      console.log(response.data.predictions[0]);
      setRecommendation(response.data.predictions[0]);
    } catch (error) {
      console.error("Error:", error);
      setRecommendation("Failed to get recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-600" />
            Crop Recommendation
          </CardTitle>
          <CardDescription className="text-center">
            Enter soil and environmental data to get crop recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="n">Nitrogen (N)</Label>
                <Input
                  id="n"
                  name="n"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.n || ""}
                  placeholder="e.g., 40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p">Phosphorus (P)</Label>
                <Input
                  id="p"
                  name="p"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.p || ""}
                  placeholder="e.g., 50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="k">Potassium (K)</Label>
                <Input
                  id="k"
                  name="k"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.k || ""}
                  placeholder="e.g., 30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  name="temperature"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.temperature || ""}
                  placeholder="e.g., 25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  name="humidity"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.humidity || ""}
                  placeholder="e.g., 70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ph">pH</Label>
                <Input
                  id="ph"
                  name="ph"
                  type="number"
                  step="0.1"
                  required
                  onChange={handleInputChange}
                  value={formData.ph || ""}
                  placeholder="e.g., 6.5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rainfall">Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  name="rainfall"
                  type="number"
                  required
                  onChange={handleInputChange}
                  value={formData.rainfall || ""}
                  placeholder="e.g., 200"
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
            <div className="text-center">
              <h3 className="font-semibold text-lg text-emerald-700">
                Recommended Crop:
              </h3>
              <p className="text-xl font-bold text-emerald-900">
                {recommendation}
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
