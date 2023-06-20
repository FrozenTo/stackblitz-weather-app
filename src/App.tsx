import React, { useState, useEffect } from 'react';
import './style.css';

const API_KEY = 'b2a33dfbb8da3bf109d5531f0acb008d';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data when the component mounts
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setLoading(false);
        setError(null);
      } else {
        setError(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('An error occurred while fetching weather data.');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    setWeatherData(null);
    setError(null);
    // Trigger fetching weather data for the entered city
    fetchWeatherData();
  };

  const roundUpTemperature = (temperature) => {
    return Math.ceil(temperature);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : weatherData ? (
        <div className="weather-card">
          <h2>{weatherData.name}</h2>
          <h3>{weatherData.weather[0].description}</h3>
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <p className="temperature">{roundUpTemperature(weatherData.main.temp)}&deg;C</p>
          <p className="location">Location: {weatherData.name}</p>
          <div className="details">
            <div className="details-item">
              <img src="https://stackblitz.com/files/stackblitz-starters-wagww9/github/FrozenTo/stackblitz-weather-app/main/public/wind2.png" alt="Wind Icon" />
              <span>{weatherData.wind.speed} m/s</span>
            </div>
            <div className="details-item">
              <img src="/wind2.png" alt="Wind Icon" />
              <span>{weatherData.main.humidity}%</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;