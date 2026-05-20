const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weatherRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Weather Forecast API',
    version: '1.0.0',
    endpoints: {
      weather: {
        method: 'GET',
        path: '/api/weather/:city',
        description: 'Get current weather for a city',
        example: '/api/weather/London'
      },
      weatherQuery: {
        method: 'GET',
        path: '/api/weather?city=cityname',
        description: 'Get current weather using query parameter',
        example: '/api/weather?city=London'
      }
    }
  });
});

app.use('/api', weatherRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🌤️  Weather API Server is running on port ${PORT}`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/weather/:city`);
  console.log(`📖 Documentation: http://localhost:${PORT}/`);
});

module.exports = app;
