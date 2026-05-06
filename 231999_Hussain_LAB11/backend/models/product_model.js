const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String
});

module.exports = mongoose.model('Product', product_schema);