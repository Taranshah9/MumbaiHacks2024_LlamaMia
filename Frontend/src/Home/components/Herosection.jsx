import Chatbot from '../../../public/Chatbot.png';
import croprecomend from '../../../public/croprecomend.png';
import diseases from '../../../public/diseases.png';
import Fertilizers from '../../../public/Fertilizers.png';
import weather from '../../../public/Weather.png';
import React from 'react';
import { Tabs } from "../../components/ui/tabs";
const TabsDemo = () => {
  const tabs = [
    {
      title: "AI Chatbot",
      value: "chatbot",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-4 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-green-800">Smart Farming Assistant</h3>
            <p className="text-sm md:text-base text-green-700 mt-2 max-w-md">
              24/7 AI-powered agricultural advice at your fingertips.
            </p>
            <TabImage src={Chatbot} />
          </div>
        </div>
      ),
    },
    {
      title: "Crop Recommendation",
      value: "crops",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-8 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-green-800">Smart Crop Selection</h3>
            <p className="text-sm md:text-base text-green-700 mt-2 max-w-md">
              Data-driven recommendations for optimal yield.
            </p>
            <TabImage src={croprecomend} />
          </div>
        </div>
      ),
    },
    {
      title: "Disease Detection",
      value: "diseases",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-8 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-green-800">Plant Health Monitor</h3>
            <p className="text-sm md:text-base text-green-700 mt-2 max-w-md">
              Early detection and treatment guidance.
            </p>
            <TabImage src={diseases} />
          </div>
        </div>
      ),
    },
    {
      title: "Fertilizer Guide",
      value: "fertilizer",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-8 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-green-800">Smart Nutrition</h3>
            <p className="text-sm md:text-base text-green-700 mt-2 max-w-md">
              Precision-based fertilization recommendations.
            </p>
            <TabImage src={Fertilizers} />
          </div>
        </div>
      ),
    },
    {
      title: "Weather Insights",
      value: "weather",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-8 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-green-800">Weather Updates</h3>
            <p className="text-sm md:text-base text-green-700 mt-2 max-w-md">
              Real-time forecasts and farming guidance.
            </p>
            <TabImage src={weather} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative p-5">
      {/* Background gradient wrapper */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 opacity-70" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Main content */}
      <div className="h-[20rem] md:h-[35rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-20">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

const TabImage = ({ src }) => {
  return (
    <div className="w-full flex justify-center mt-8">
      <img
        src={src}
        alt="feature illustration"
        className="w-4/5 md:w-2/3 h-auto object-contain rounded-xl"
      />
    </div>
  );
};

// Add this to your CSS/Tailwind config
const style = {
  '.animate-blob': {
    animation: 'blob 7s infinite',
  },
  '.animation-delay-2000': {
    animationDelay: '2s',
  },
  '.animation-delay-4000': {
    animationDelay: '4s',
  },
  '@keyframes blob': {
    '0%': {
      transform: 'translate(0px, 0px) scale(1)',
    },
    '33%': {
      transform: 'translate(30px, -50px) scale(1.1)',
    },
    '66%': {
      transform: 'translate(-20px, 20px) scale(0.9)',
    },
    '100%': {
      transform: 'translate(0px, 0px) scale(1)',
    },
  },
};

export default TabsDemo;