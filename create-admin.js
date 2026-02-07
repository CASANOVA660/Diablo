import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const createAdmin = async () => {
  try {
    console.log('Creating admin account...');
    const response = await axios.post(`${API_URL}/admin/register`, {
      username: 'achref',
      email: 'achref@diablo.com',
      password: 'ach123456789'
    });
    
    console.log('✅ Admin account created successfully!');
    console.log('Username: achref');
    console.log('Password: ach123456789');
    console.log('\nYou can now login at: http://localhost:3000/admin/login');
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
      console.log('ℹ️  Admin account already exists');
    } else {
      console.error('❌ Error creating admin:', error.response?.data?.message || error.message);
      console.log('\nMake sure the backend server is running on http://localhost:5000');
    }
  }
};

createAdmin();



