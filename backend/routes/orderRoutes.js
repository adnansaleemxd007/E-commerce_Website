const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST /api/orders
// @desc    Create a new order
router.post('/', async (req, res) => {
  try {
    const { customerDetails, items, totalAmount } = req.body;

    if (!customerDetails || !items || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const newOrder = new Order({
      customerDetails,
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    
    res.status(201).json({
      message: 'Order created successfully',
      orderId: savedOrder._id
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server Error: Could not place order' });
  }
});

module.exports = router;
