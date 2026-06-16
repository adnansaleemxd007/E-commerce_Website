const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    const formattedProducts = products.map(p => ({
      ...p._doc,
      id: p._id.toString()
    }));
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;
    const newProduct = new Product({ title, price, description, category, image });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price, description, category, image },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
