const express = require('express');
const router = express.Router();
const { get_products } = require('../controllers/product_controller');

router.get('/', get_products);

module.exports = router;