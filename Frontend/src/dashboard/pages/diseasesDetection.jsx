import React, { useState } from "react";
import { Upload, AlertCircle, Leaf, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const LoadingAnimation = () => (
  <div className="flex items-center justify-center p-8">
    <div className="relative">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6"
          style={{
            bottom: '2rem',
            animation:` bounce ${1 + i * 0.2}s infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          <Leaf
            className={`text-emerald-500 transform ${
              i % 2 === 0 ? "rotate-[-45deg]" : "rotate-45deg]"
            }`}
          />
        </div>
      ))}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-emerald-600 font-medium">
        Analyzing Plant...
      </div>
    </div>
  </div>
);
const MedicalImageAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState("english");

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setError(null);

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          content: `Uploaded: ${file.name}`,
        },
      ]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("language", language.toLowerCase().slice(0, 2));
    try {
      const response = await axios.post(
        "https://mumbaihacks-chatdisease.onrender.com/classify_plant_disease",
        formData
      );

      let diagnosis = response.data.diagnosis;
      if (diagnosis) {
        diagnosis = diagnosis.replace(/\*/g, "").replace(/\s+/g, " ").trim();
      }

      console.log(diagnosis);
      setMessages(() => [
        {
          type: "bot",
          content: diagnosis,
        },
      ]);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setError("Failed to analyze the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-full relative py-4">
            <h1 className="text-2xl font-bold text-emerald-800 flex items-center justify-center gap-2">
              <Leaf className="h-6 w-6 text-emerald-600" />
              Plant Health Analysis
            </h1>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-800">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[120px] bg-white text-emerald-800">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="gujarati">Gujarati</SelectItem>
                  <SelectItem value="marathi">Marathi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="bg-white shadow-md border-emerald-100">
            <CardHeader className="text-center">
              <CardTitle className="text-emerald-700">
                Upload Plant Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upload Area */}
                <div
                  className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center
                            hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300
                            cursor-pointer relative"
                >
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <Upload className="h-10 w-10 text-emerald-400" />
                      <div className="text-emerald-600 font-medium">
                        Click to upload or drag and drop
                      </div>
                      <div className="text-sm text-emerald-500">
                        PNG, JPG, GIF up to 10MB
                      </div>
                    </div>
                  </label>
                </div>

                {/* Preview */}
                {preview && (
                  <div className="rounded-lg overflow-hidden border-2 border-emerald-100">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={!selectedFile || loading}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-sm
                            transition-all duration-300 ${
                              !selectedFile || loading
                                ? "bg-emerald-300 cursor-not-allowed"
                                : "bg-emerald-500 hover:bg-emerald-600 hover:shadow-md"
                            }`}
                >
                  {loading ? "Analyzing..." : "Analyze Plant"}
                </button>

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white shadow-md border-emerald-100">
            <CardHeader className="text-center">
              <CardTitle className="text-emerald-700">
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-b from-emerald-50 to-white rounded-lg h-[400px] flex flex-col border border-emerald-100">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-emerald-500">
                      Upload a plant image to begin analysis
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 ${
                          message.type === "bot"
                            ? "flex-row"
                            : "flex-row-reverse"
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                      ${
                                        message.type === "bot"
                                          ? "bg-emerald-100"
                                          : "bg-emerald-500"
                                      }`}
                        >
                          {message.type === "bot" ? (
                            <Leaf className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <User className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div
                          className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                            message.type === "bot"
                              ? "bg-white border border-emerald-100 text-emerald-800"
                              : "bg-emerald-500 text-white"
                          }`}
                        >
                          <pre className="whitespace-pre-wrap font-sans text-sm">
                            {message.content}
                          </pre>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {loading && <LoadingAnimation />}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicalImageAnalysis;
