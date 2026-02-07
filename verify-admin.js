import mongoose from 'mongoose';
import Admin from './backend/models/Admin.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, 'backend', '.env') });

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: 'achref' });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin account already exists');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      
      // Test password
      const isMatch = await existingAdmin.comparePassword('ach123456789');
      if (isMatch) {
        console.log('✅ Password is correct');
      } else {
        console.log('❌ Password does not match');
        console.log('Deleting old admin and creating new one...');
        await Admin.deleteOne({ username: 'achref' });
      }
    }

    // Create or recreate admin
    if (!existingAdmin || !(await existingAdmin.comparePassword('ach123456789'))) {
      const admin = new Admin({
        username: 'achref',
        email: 'achref@diablo.com',
        password: 'ach123456789',
        role: 'admin'
      });
      
      await admin.save();
      console.log('✅ Admin account created successfully!');
      console.log('Username: achref');
      console.log('Password: ach123456789');
    }

    await mongoose.disconnect();
    console.log('\n🎉 Done! You can now login at: http://localhost:3000/admin/login');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
