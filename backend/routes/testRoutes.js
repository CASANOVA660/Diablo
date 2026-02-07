import express from 'express';
import Product from '../models/Product.js';
import Admin from '../models/Admin.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import mongoose from 'mongoose';

const router = express.Router();

// Test database connection and collections
router.get('/test-db', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    const stats = {
      database: db.databaseName,
      connectionStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      collections: collections.map(c => c.name),
      counts: {}
    };

    // Get counts for each collection
    if (collections.find(c => c.name === 'products')) {
      stats.counts.products = await Product.countDocuments();
    }
    if (collections.find(c => c.name === 'admins')) {
      stats.counts.admins = await Admin.countDocuments();
    }
    if (collections.find(c => c.name === 'carts')) {
      stats.counts.carts = await Cart.countDocuments();
    }
    if (collections.find(c => c.name === 'orders')) {
      stats.counts.orders = await Order.countDocuments();
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;



