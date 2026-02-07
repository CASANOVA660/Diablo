# Quick Start Guide

## 🚀 Fast Setup (Windows)

1. **Double-click `start.bat`** - This will:
   - Install all dependencies automatically
   - Start both backend and frontend servers
   - Open them in separate windows

## 🚀 Fast Setup (Mac/Linux)

1. **Make script executable:**
   ```bash
   chmod +x start.sh
   ```

2. **Run the script:**
   ```bash
   ./start.sh
   ```

## 📋 Manual Setup

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:3000

## 🔐 Create Admin Account

After starting the backend, create an admin account using one of these methods:

### Method 1: Using curl (Recommended)
```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"email\":\"admin@diablo.com\",\"password\":\"admin123\"}"
```

### Method 2: Using Postman or Thunder Client
- URL: `POST http://localhost:5000/api/admin/register`
- Body (JSON):
```json
{
  "username": "admin",
  "email": "admin@diablo.com",
  "password": "admin123"
}
```

### Method 3: Using MongoDB Compass
1. Connect to your MongoDB cluster
2. Navigate to `diablo` database
3. Go to `admins` collection
4. Insert document:
```json
{
  "username": "admin",
  "email": "admin@diablo.com",
  "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
}
```
(Password hash is for "admin123")

## ✅ Verify Everything Works

1. **Frontend:** Open http://localhost:3000
   - Should see the DIABLO homepage

2. **Backend API:** Open http://localhost:5000/api/health
   - Should see: `{"status":"OK","message":"DIABLO API is running"}`

3. **Admin Panel:** Open http://localhost:3000/admin/login
   - Login with your created admin credentials
   - You can now add products!

## 📝 Environment Variables

The `.env` files are already created with:
- ✅ MongoDB connection string configured
- ✅ Backend port: 5000
- ✅ Frontend API URL: http://localhost:5000/api

## 🛠️ Troubleshooting

### Port Already in Use
- Backend (5000): Change `PORT` in `backend/.env`
- Frontend (3000): Vite will automatically use next available port

### MongoDB Connection Error
- Check your internet connection
- Verify the connection string in `backend/.env`
- Ensure MongoDB Atlas allows connections from your IP (check Network Access)

### Admin Login Not Working
- Make sure you created an admin account first
- Check browser console for errors
- Verify JWT_SECRET in `backend/.env` matches

### Dependencies Installation Fails
- Make sure you have Node.js 18+ installed
- Try deleting `node_modules` and `package-lock.json`, then reinstall
- On Windows, you might need to run as Administrator

## 🎯 Next Steps

1. **Add Products:** Login to admin panel and add your first product
2. **Test Shopping:** Add products to cart and test checkout
3. **Customize:** Modify products, prices, and images as needed

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Check `SETUP.md` for advanced setup options



