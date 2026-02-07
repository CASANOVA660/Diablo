# Installation Guide

## ✅ Everything is Ready!

Your MongoDB connection string is already configured. Just follow these steps:

## Step 1: Create Environment Files

### Windows:
Double-click `setup-env.bat`

### Mac/Linux:
```bash
chmod +x setup-env.sh
./setup-env.sh
```

This creates:
- `backend/.env` - with your MongoDB connection string
- `frontend/.env` - with API URL

## Step 2: Install Dependencies

### Option A: Install Everything at Once
```bash
npm run install-all
```

### Option B: Install Separately

**Backend:**
```bash
cd backend
npm install
cd ..
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

## Step 3: Start the Project

### Option A: Use Start Scripts (Easiest)

**Windows:**
Double-click `start.bat`

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 4: Create Admin Account

Open a new terminal and run:

```bash
curl -X POST http://localhost:5000/api/admin/register -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"email\":\"admin@diablo.com\",\"password\":\"admin123\"}"
```

Or use Postman/Thunder Client:
- POST `http://localhost:5000/api/admin/register`
- Body:
```json
{
  "username": "admin",
  "email": "admin@diablo.com",
  "password": "admin123"
}
```

## Step 5: Access the Application

- 🌐 **Frontend:** http://localhost:3000
- 🔧 **Backend API:** http://localhost:5000/api
- 👤 **Admin Panel:** http://localhost:3000/admin/login
  - Username: `admin`
  - Password: `admin123`

## ✅ Verify Everything Works

1. **Check Backend:** Open http://localhost:5000/api/health
   - Should see: `{"status":"OK","message":"DIABLO API is running"}`

2. **Check Frontend:** Open http://localhost:3000
   - Should see the DIABLO homepage

3. **Check MongoDB:** Backend console should show "MongoDB Connected"

## 🎯 Next Steps

1. Login to admin panel
2. Add your first product
3. Test the shopping cart
4. Complete a test order

## 🐛 Troubleshooting

### "Cannot find module" errors
- Make sure you ran `npm install` in both backend and frontend folders
- Delete `node_modules` and `package-lock.json`, then reinstall

### MongoDB connection error
- Check your internet connection
- Verify MongoDB Atlas allows connections from your IP
- Check the connection string in `backend/.env`

### Port already in use
- Backend (5000): Change `PORT` in `backend/.env`
- Frontend (3000): Vite will auto-use next available port

### Admin login not working
- Make sure you created an admin account first
- Check browser console for errors
- Verify backend is running

## 📝 What's Already Configured

✅ MongoDB connection string  
✅ Backend port (5000)  
✅ Frontend API URL  
✅ JWT secret key  
✅ All routes and controllers  
✅ All React components  
✅ Admin panel  

**You're all set! Just install and run! 🚀**



