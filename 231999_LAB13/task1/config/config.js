require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  openWeather: {
    apiKey: process.env.OPENWEATHER_API_KEY,
    baseUrl: process.env.OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5'
  }
};

// Validate required environment variables
if (!config.openWeather.apiKey) {
  console.error(' ERROR: OPENWEATHER_API_KEY is not set in .env file');
  console.log(' Please create a .env file and add your OpenWeather API key');
  console.log(' Get your free API key at: https://openweathermap.org/api');
  process.exit(1);
}

module.exports = config;
