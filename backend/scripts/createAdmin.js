import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from backend directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const createAdmin = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env file!');
      process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    console.log('Database:', MONGODB_URI.split('/').pop().split('?')[0]);
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: 'achref' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin account already exists!');
      console.log(`   Username: ${existingAdmin.username}`);
      console.log(`   Email: ${existingAdmin.email}`);
      
      // Test password
      const passwordMatch = await existingAdmin.comparePassword('ach123456789');
      if (passwordMatch) {
        console.log('✅ Password is correct!');
        console.log('\nYou can login with:');
        console.log('   Username: achref');
        console.log('   Password: ach123456789');
      } else {
        console.log('❌ Password does not match!');
        console.log('\nDeleting old admin and creating new one...');
        await Admin.deleteOne({ username: 'achref' });
        
        const newAdmin = new Admin({
          username: 'achref',
          email: 'achref@diablo.com',
          password: 'ach123456789'
        });
        await newAdmin.save();
        console.log('✅ New admin created successfully!');
        console.log('\nLogin credentials:');
        console.log('   Username: achref');
        console.log('   Password: ach123456789');
      }
    } else {
      console.log('Creating admin account...');
      const admin = new Admin({
        username: 'achref',
        email: 'achref@diablo.com',
        password: 'ach123456789'
      });
      await admin.save();
      console.log('✅ Admin account created successfully!');
      console.log('\nLogin credentials:');
      console.log('   Username: achref');
      console.log('   Password: ach123456789');
    }
    
    console.log('\n🌐 Login at: http://localhost:3000/admin/login');
    console.log('\n📊 Database:', mongoose.connection.db.databaseName);
    
    await mongoose.disconnect();
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
