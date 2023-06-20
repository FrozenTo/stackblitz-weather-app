import React, { useState, useEffect } from 'react';
import './index.tsx';

const API_KEY = 'b2a33dfbb8da3bf109d5531f0acb008d'; 

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch weather data when the component mounts
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="weather-card">
          <h2>{weatherData?.name}</h2>
          <h3>{weatherData?.weather[0]?.description}</h3>
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`}
            alt="Weather Icon"
          />
          <p className="temperature">{weatherData?.main?.temp}&deg;C</p>
          <p className="location">Location: {weatherData?.name}</p>
          <div className="details">
            <div className="details-item">
              <img src="/path/to/wind-icon.png" alt="Wind Icon" />
              <span>{weatherData?.wind?.speed} m/s</span>
            </div>
            <div className="details-item">
              <img src="/path/to/humidity-icon.png" alt="Humidity Icon" />
              <span>{weatherData?.main?.humidity}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;