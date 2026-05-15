const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');

// Get all collections
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single collection
router.get('/:slug', async (req, res) => {
  try {
    const collection = await Collection.findOne({ slug: req.params.slug });
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create collection
router.post('/', async (req, res) => {
  try {
    const collection = new Collection(req.body);
    const newCollection = await collection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update collection
router.put('/:id', async (req, res) => {
  try {
    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    res.json(collection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete collection
router.delete('/:id', async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    res.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
