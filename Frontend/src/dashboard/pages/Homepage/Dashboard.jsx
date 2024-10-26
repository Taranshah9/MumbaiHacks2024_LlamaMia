import { useState } from "react";
import { Thermometer, Droplets, Gauge, Wind } from "lucide-react";
import { cities } from '../../../../data';
import { MetricCard } from './MetricCard';
import WeatherCharts  from './Chart/WeatherChart';
import  WeatherTable  from './WeatherTable';
import { CitySelector } from './CitySelector';
import { useWeatherData } from './useWeatherData';

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState(cities[0].value);
  const { currentWeather, forecastData } = useWeatherData(selectedCity);

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br min-h-screen">
      <CitySelector 
        selectedCity={selectedCity} 
        onCityChange={handleCityChange}
        cities={cities}
      />

      {currentWeather && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Temperature"
            value={currentWeather.temp}
            unit="°C"
            icon={Thermometer}
            color="bg-red-500"
          />
          <MetricCard
            title="Humidity"
            value={currentWeather.humidity}
            unit="%"
            icon={Droplets}
            color="bg-blue-500"
          />
          <MetricCard
            title="Pressure"
            value={currentWeather.pressure}
            unit="hPa"
            icon={Gauge}
            color="bg-green-500"
          />
          <MetricCard
            title="Wind Speed"
            value={currentWeather.windSpeed}
            unit="m/s"
            icon={Wind}
            color="bg-purple-500"
          />
        </div>
      )}

      <WeatherCharts forecastData={forecastData} />
      <WeatherTable forecastData={forecastData} />
    </div>
  );
};

export default Dashboard;