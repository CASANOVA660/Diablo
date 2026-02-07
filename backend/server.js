import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import testRoutes from './routes/testRoutes.js';
import verifyRoutes from './routes/verifyRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from backend directory (will be reloaded before MongoDB connection)
const envPath = join(__dirname, '.env');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/test', testRoutes);
app.use('/api/verify', verifyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'DIABLO API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    databaseName: mongoose.connection.db?.databaseName || 'Not connected'
  });
});

// MongoDB Connection
// Force reload environment variables to ensure latest values
console.log('Loading .env from:', envPath);
const envResult = dotenv.config({ path: envPath, override: true });

if (envResult.error) {
  console.error('❌ Error loading .env file:', envResult.error);
} else {
  console.log('✅ .env file loaded successfully');
}

// Check if MONGODB_URI is loaded
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env file!');
  console.error('   Make sure backend/.env exists and contains MONGODB_URI');
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/diablo';

// Debug: Show what's being loaded
console.log('\n=== MongoDB Connection Debug ===');
console.log('MONGODB_URI from process.env:', process.env.MONGODB_URI ? '✅ Found' : '❌ NOT FOUND');
if (process.env.MONGODB_URI) {
  console.log('Connection String:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
  const dbName = process.env.MONGODB_URI.split('/').pop().split('?')[0];
  console.log('Database Name from URI:', dbName);
}
console.log('Using MONGODB_URI:', MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
const dbName = MONGODB_URI.split('/').pop().split('?')[0];
console.log('Database Name:', dbName);
console.log('===============================\n');

// Extract database name from connection string
const dbNameFromURI = MONGODB_URI.split('/').pop().split('?')[0];
console.log('Connecting to database:', dbNameFromURI);

mongoose
  .connect(MONGODB_URI, {
    dbName: dbNameFromURI, // Explicitly set database name
  })
  .then(() => {
    const db = mongoose.connection.db;
    console.log('✅ MongoDB Connected Successfully');
    console.log('Actual Database Name:', db.databaseName);
    console.log('Expected Database Name:', dbNameFromURI);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    
    if (db.databaseName !== dbNameFromURI) {
      console.warn('⚠️ WARNING: Database name mismatch!');
      console.warn('   Expected:', dbNameFromURI);
      console.warn('   Actual:', db.databaseName);
    }
    
    // List collections to verify connection
    db.listCollections().toArray().then(collections => {
      console.log('Existing Collections:', collections.map(c => c.name).join(', ') || 'None (will be created when data is saved)');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

