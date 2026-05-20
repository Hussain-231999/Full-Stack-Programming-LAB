const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/weather/:city', weatherController.getWeatherByCity);
router.get('/weather', weatherController.getWeatherByQuery);
module.exports = router;