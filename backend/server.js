try { require('dotenv').config(); } catch (e) { /* dotenv not needed in production */ }

// Only override DNS on non-serverless environments
if (!process.env.VERCEL) {
  try {
    const dns = require('node:dns');
    dns.setServers(['8.8.8.8', '8.8.4.4']);
  } catch (e) { /* DNS override not available */ }
}

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware to parse JSON (increased limit for Base64 images)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Add a simple health check route
app.get('/api/health', (req, res) => res.send('API is running...'));

// Serve frontend in production (Render, etc.)
const path = require('path');
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

module.exports = app;
