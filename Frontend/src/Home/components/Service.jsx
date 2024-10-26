/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Camera, CloudSun, Bot } from 'lucide-react';
import phone from '../../../public/phone.jpg';
import forecast from '../../../public/forecast.jpg';
import ai from '../../../public/ai.jpeg';

const ServiceItem = ({ image, icon, title, description, isReversed }) => (
  <div 
  id="services"
    className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center mb-16`}
    data-aos={isReversed ? "fade-left" : "fade-right"}
    data-aos-duration="1000"
    data-aos-once="true"
  >
    <div className="md:w-1/2 mb-6 md:mb-0">
      <img src={image} alt={title} className="w-full h-64 object-cover rounded-lg shadow-md" />
    </div>
    <div className={`md:w-1/2 ${isReversed ? 'md:pr-12' : 'md:pl-12'}`}>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-2xl font-semibold ml-3">{title}</h3>
      </div>
      <p className="text-gray-700 text-lg">{description}</p>
    </div>
  </div>
);

const Service = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="container mx-auto py-5 px-4">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800" data-aos="fade-up">Our Services</h2>
      <div>
        <ServiceItem
          image={phone}
          icon={<Camera className="text-green-500" size={28} />}
          title="Plant Disease Detection"
          description="Take a picture of your plants to quickly identify diseases and get treatment recommendations. Our advanced AI algorithms analyze the images to provide accurate diagnoses and suggest appropriate remedies."
          isReversed={false}
        />
        <ServiceItem
          image={forecast}
          icon={<CloudSun className="text-blue-500" size={28} />}
          title="Weather Forecast & Alerts"
          description="Receive accurate weather forecasts, storm alerts, and best farming practices based on current conditions. Stay ahead of weather changes and optimize your farming activities with our real-time updates and personalized recommendations."
          isReversed={true}
        />
        <ServiceItem
          image={ai}
          icon={<Bot className="text-purple-500" size={28} />}
          title="AI Farming Assistant"
          description="Get real-time answers to your farming queries and personalized advice from our AI-powered assistant. Our intelligent system provides tailored recommendations for crop management, pest control, and yield optimization based on your specific farm conditions."
          isReversed={false}
        />
      </div>
    </div>
  );
}

export default Service;