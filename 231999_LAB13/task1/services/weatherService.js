const axios = require('axios');
const config = require('../config/config');

/**
 * Fetch weather data from OpenWeather API
 * @param {string} city - City name
 * @returns {Promise<Object>} Formatted weather data
 */
const fetchWeather = async (city) => {
  try {
    // Make request to OpenWeather API
    const response = await axios.get(`${config.openWeather.baseUrl}/weather`, {
      params: {
        q: city,
        appid: config.openWeather.apiKey,
        units: 'metric' // Use metric units (Celsius)
      }
    });

    // Extract and format relevant data
    const weatherData = formatWeatherData(response.data);
    return weatherData;

  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // API responded with error status
      const status = error.response.status;
      
      if (status === 404) {
        throw new Error(`City '${city}' not found. Please check the city name and try again.`);
      } else if (status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API configuration.');
      } else if (status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Weather service error: ${error.response.data.message || 'Unknown error'}`);
      }
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Unable to connect to weather service. Please check your internet connection.');
    } else {
      // Error in request setup
      throw new Error(`Error fetching weather data: ${error.message}`);
    }
  }
};

/**
 * Format raw weather data into required structure
 * @param {Object} data - Raw data from OpenWeather API
 * @returns {Object} Formatted weather data
 */
const formatWeatherData = (data) => {
  return {
    city: data.name,
    country: data.sys.country,
    temperature: {
      current: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      min: Math.round(data.main.temp_min),
      max: Math.round(data.main.temp_max),
      unit: '°C'
    },
    weather: {
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    },
    humidity: `${data.main.humidity}%`,
    pressure: `${data.main.pressure} hPa`,
    wind: {
      speed: `${data.wind.speed} m/s`,
      direction: data.wind.deg
    },
    clouds: `${data.clouds.all}%`,
    visibility: `${(data.visibility / 1000).toFixed(1)} km`,
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
    timezone: data.timezone,
    coordinates: {
      latitude: data.coord.lat,
      longitude: data.coord.lon
    },
    timestamp: new Date(data.dt * 1000).toISOString()
  };
};

module.exports = {
  fetchWeather
};
