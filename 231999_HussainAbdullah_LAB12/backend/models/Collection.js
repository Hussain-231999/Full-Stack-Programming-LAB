const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    default: 'COLLECTION'
  },
  image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Collection', collectionSchema);
