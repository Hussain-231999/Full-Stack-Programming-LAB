const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Valid country codes for NewsAPI
const validCountryCodes = [
  'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 
  'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 
  'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 
  'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 
  've', 'za'
];

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'News API Service',
    endpoints: {
      'GET /': 'API information',
      'GET /news/:country': 'Get top headlines for a country',
      'GET /countries': 'Get list of supported country codes'
    },
    example: 'GET /news/us - Get top headlines from United States'
  });
});

// Get supported countries
app.get('/countries', (req, res) => {
  const countryInfo = {
    message: 'Supported country codes',
    count: validCountryCodes.length,
    countries: validCountryCodes,
    usage: 'Use these codes in /news/:country endpoint',
    examples: [
      { code: 'us', description: 'United States' },
      { code: 'gb', description: 'United Kingdom' },
      { code: 'ca', description: 'Canada' },
      { code: 'au', description: 'Australia' },
      { code: 'in', description: 'India' },
      { code: 'pk', description: 'Pakistan' }
    ]
  };
  res.json(countryInfo);
});

// Main route - Get news by country
app.get('/news/:country', async (req, res) => {
  try {
    // Extract country code from URL parameter
    const countryCode = req.params.country.toLowerCase();
    
    // Validate country code
    if (!validCountryCodes.includes(countryCode)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid country code',
        message: `Country code "${countryCode}" is not supported`,
        supportedCodes: validCountryCodes,
        hint: 'Use GET /countries to see all supported country codes'
      });
    }

    // Check if API key exists
    if (!process.env.NEWS_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'API configuration error',
        message: 'NEWS_API_KEY is not configured. Please add your NewsAPI key to .env file'
      });
    }

    // Fetch news from NewsAPI
    const apiUrl = 'https://newsapi.org/v2/top-headlines';
    const response = await axios.get(apiUrl, {
      params: {
        country: countryCode,
        apiKey: process.env.NEWS_API_KEY,
        pageSize: 10 // Limit to 10 articles
      }
    });

    // Check if API returned articles
    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No news articles found for country code: ${countryCode}`,
        country: countryCode
      });
    }

    // Process and filter the response
    const processedArticles = response.data.articles
      .filter(article => article.title && article.url) // Filter out articles without title or URL
      .slice(0, 10) // Ensure max 10 articles
      .map((article, index) => ({
        id: index + 1,
        title: article.title,
        source: article.source?.name || 'Unknown Source',
        url: article.url,
        publishedAt: article.publishedAt,
        description: article.description || 'No description available',
        author: article.author || 'Unknown'
      }));

    // Return structured JSON response
    res.json({
      success: true,
      country: countryCode.toUpperCase(),
      totalResults: processedArticles.length,
      articles: processedArticles,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // NewsAPI returned an error
      const statusCode = error.response.status;
      let errorMessage = 'Error fetching news from NewsAPI';
      
      switch (statusCode) {
        case 401:
          errorMessage = 'Invalid API key. Please check your NEWS_API_KEY in .env file';
          break;
        case 429:
          errorMessage = 'API rate limit exceeded. Please try again later';
          break;
        case 500:
          errorMessage = 'NewsAPI server error. Please try again later';
          break;
        default:
          errorMessage = error.response.data?.message || 'Unknown API error';
      }

      return res.status(statusCode).json({
        success: false,
        error: errorMessage,
        statusCode: statusCode
      });
    } else if (error.request) {
      // Request was made but no response received
      return res.status(503).json({
        success: false,
        error: 'Unable to reach NewsAPI',
        message: 'Network error. Please check your internet connection'
      });
    } else {
      // Something else happened
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
      });
    }
  }
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.path}`,
    availableRoutes: ['/', '/countries', '/news/:country']
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` News API Server is running on port ${PORT}`);
  console.log(` Access the API at: http://localhost:${PORT}`);
  console.log(` Example: http://localhost:${PORT}/news/us`);
  console.log(` Countries list: http://localhost:${PORT}/countries`);
});
