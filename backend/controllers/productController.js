import Product from '../models/Product.js';
import mongoose from 'mongoose';

// Normalize product so frontend always has images array
function normalizeProduct(product) {
  const doc = product.toObject ? product.toObject() : product;
  const images = Array.isArray(doc.images) && doc.images.length
    ? doc.images
    : (doc.image ? [doc.image] : []);
  return { ...doc, images };
}

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products.map(normalizeProduct));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(normalizeProduct(product));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product (Admin only)
export const createProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    if (Array.isArray(body.images) && body.images.length) {
      body.image = body.images[0];
    } else if (body.image) {
      body.images = [body.image];
    }
    if (!body.images || body.images.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }
    console.log('Creating product:', body);
    const product = new Product(body);
    const savedProduct = await product.save();
    console.log('✅ Product saved to database:', savedProduct._id);
    console.log('Database:', mongoose.connection.db.databaseName);
    res.status(201).json(normalizeProduct(savedProduct));
  } catch (error) {
    console.error('❌ Error saving product:', error);
    res.status(400).json({ message: error.message });
  }
};
// Update product (Admin only)
export const updateProduct = async (req, res) => {
  try {
    const body = { ...req.body };
    if (Array.isArray(body.images) && body.images.length) {
      body.image = body.images[0];
    } else if (body.image) {
      body.images = [body.image];
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(normalizeProduct(product));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

