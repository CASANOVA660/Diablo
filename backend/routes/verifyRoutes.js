import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Admin from '../models/Admin.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

const router = express.Router();

// Verify data in database
router.get('/verify-data', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    const data = {
      connection: {
        status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        databaseName: db.databaseName,
        host: mongoose.connection.host,
        port: mongoose.connection.port,
      },
      collections: collectionNames,
      counts: {},
      sampleData: {}
    };

    // Get counts and sample data
    if (collectionNames.includes('products')) {
      data.counts.products = await Product.countDocuments();
      data.sampleData.products = await Product.find().limit(2).select('name price');
    }
    
    if (collectionNames.includes('admins')) {
      data.counts.admins = await Admin.countDocuments();
      data.sampleData.admins = await Admin.find().limit(2).select('username email');
    }
    
    if (collectionNames.includes('carts')) {
      data.counts.carts = await Cart.countDocuments();
    }
    
    if (collectionNames.includes('orders')) {
      data.counts.orders = await Order.countDocuments();
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

export default router;



