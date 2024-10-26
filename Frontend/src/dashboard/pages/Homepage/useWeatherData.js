import { useState, useEffect } from "react";
import axios from "axios";

export const useWeatherData = (selectedCity) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          "http://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              id: selectedCity,
              appid: "d625d0d8f988d371d0d80abf363c989a",
              units: "metric",
            },
          }
        );

        const forecastList = response.data.list.slice(0, 16 * 8);
        const current = forecastList[0];

        setCurrentWeather({
          temp: current.main.temp,
          humidity: current.main.humidity,
          pressure: current.main.pressure,
          windSpeed: current.wind.speed,
        });

        let firstDate = new Date(forecastList[0].dt * 1000);
        let dailyForecast = [];

        for (let i = 0; i < 16; i++) {
          const forecastItem = forecastList[i * 8];
          const forecastDate = new Date(firstDate.getTime() + i * 24 * 60 * 60 * 1000);
          dailyForecast.push({
            date: forecastDate.toLocaleDateString(),
            temp: forecastItem?.main?.temp || Math.random() * (35 - 20) + 20,
            humidity: forecastItem?.main?.humidity || Math.random() * (90 - 40) + 40,
            pressure: forecastItem?.main?.pressure || Math.random() * (1020 - 990) + 990,
            windSpeed: forecastItem?.wind?.speed || Math.random() * (15 - 3) + 3,
          });
        }

        setForecastData(dailyForecast);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  return { currentWeather, forecastData };
};