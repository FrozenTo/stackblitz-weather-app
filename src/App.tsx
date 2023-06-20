import React, { useState, useEffect } from 'react';
import './style.css';

const API_KEY = 'b2a33dfbb8da3bf109d5531f0acb008d';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Fetch weather data when the component mounts
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  useEffect(() => {
    // Update the body styles when the language or theme changes
    document.body.dataset.lang = language;
    document.body.dataset.theme = theme;
    localStorage.setItem('language', language);
    localStorage.setItem('theme', theme);
  }, [language, theme]);

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

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const changeTheme = (theme) => {
    setTheme(theme);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>
          {language === 'en'
            ? 'Weather App'
            : language === 'ru'
            ? 'Приложение Погоды'
            : 'Ilma Rakendus'}
        </h1>
        <div className="search">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Enter city name'
                : language === 'ru'
                ? 'Введите название города'
                : 'Sisesta linna nimi'
            }
          />
          <button className="search-button" onClick={handleSearch}>
            {language === 'en'
              ? 'Search'
              : language === 'ru'
              ? 'Поиск'
              : 'Otsi'}
          </button>
        </div>
        {loading ? (
          <p>
            {language === 'en'
              ? 'Loading...'
              : language === 'ru'
              ? 'Загрузка...'
              : 'Laadimine...'}
          </p>
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
            <p className="temperature">
              {roundUpTemperature(weatherData.main.temp)}&deg;C
            </p>
            <p className="location">
              {language === 'en'
                ? 'Location'
                : language === 'ru'
                ? 'Местоположение'
                : 'Asukoht'}
              : {weatherData.name}
            </p>
            <div className="details">
              <div className="details-item">
                <img
                  src="https://stackblitz.com/files/stackblitz-starters-wagww9/github/FrozenTo/stackblitz-weather-app/main/public/wind2.png"
                  alt={
                    language === 'en'
                      ? 'Wind Icon'
                      : language === 'ru'
                      ? 'Иконка Ветра'
                      : 'Tuule Ikoon'
                  }
                />
                <span>{weatherData.wind.speed} m/s</span>
              </div>
              <div className="details-item">
                <img
                  src="https://github.com/FrozenTo/stackblitz-weather-app/blob/main/public/cloud.png?raw=true"
                  alt={
                    language === 'en'
                      ? 'Rain Icon'
                      : language === 'ru'
                      ? 'Иконка Дождя'
                      : 'Vihma Ikoon'
                  }
                />
                <span>{weatherData.main.humidity}%</span>
              </div>
            </div>
          </div>
        ) : null}
        <div className="language-select">
          <button
            className="language-button"
            onClick={() => changeLanguage('en')}
          >
            ENG
          </button>
          <button
            className="language-button"
            onClick={() => changeLanguage('ru')}
          >
            RU
          </button>
          <button
            className="language-button"
            onClick={() => changeLanguage('et')}
          >
            EST
          </button>
        </div>
        <div className="theme-select">
          <button className="theme-button" onClick={() => changeTheme('light')}>
            Light
          </button>
          <button className="theme-button" onClick={() => changeTheme('dark')}>
            Dark
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
