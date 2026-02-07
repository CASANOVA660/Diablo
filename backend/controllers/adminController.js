import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register (for initial setup)
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Creating admin account:', { username, email });
    
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });
    
    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      return res.status(400).json({ message: 'Admin already exists' });
    }
    
    const admin = new Admin({ username, email, password });
    const savedAdmin = await admin.save();
    console.log('✅ Admin saved to database:', savedAdmin._id);
    console.log('Database:', mongoose.connection.db.databaseName);
    
    const token = jwt.sign(
      { adminId: savedAdmin._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      admin: {
        id: savedAdmin._id,
        username: savedAdmin.username,
        email: savedAdmin.email,
        role: savedAdmin.role,
      },
    });
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get admin profile
export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

