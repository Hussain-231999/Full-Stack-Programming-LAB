const weatherService = require('../services/weatherService');

/**
 * Get weather information by city name (path parameter)
 * @route GET /api/weather/:city
 */
const getWeatherByCity = async (req, res, next) => {
  try {
    const { city } = req.params;

    // Validate city parameter
    if (!city || city.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'City name is required'
      });
    }

    // Fetch weather data
    const weatherData = await weatherService.fetchWeather(city);

    // Send successful response
    res.status(200).json({
      success: true,
      data: weatherData
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get weather information by city name (query parameter)
 * @route GET /api/weather?city=cityname
 */
const getWeatherByQuery = async (req, res, next) => {
  try {
    const { city } = req.query;

    // Validate city parameter
    if (!city || city.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'City name is required as query parameter'
      });
    }

    // Fetch weather data
    const weatherData = await weatherService.fetchWeather(city);

    // Send successful response
    res.status(200).json({
      success: true,
      data: weatherData
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWeatherByCity,
  getWeatherByQuery
};
