# 🚀 START HERE - DIABLO E-commerce

## Your MongoDB is Already Configured! ✅

Your connection string is set up and ready to use.

## Quick Start (3 Steps)

### Step 1: Create Environment Files

**Windows:** Double-click `setup-env.bat`  
**Mac/Linux:** Run `./setup-env.sh`

This creates the `.env` files with your MongoDB connection.

### Step 2: Install Dependencies

```bash
npm run install-all
```

Or manually:
```bash
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### Step 3: Start the Project

**Windows:** Double-click `start.bat`  
**Mac/Linux:** Run `./start.sh`

Or manually (2 terminals):
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

## Create Admin Account

After backend starts, run this in a new terminal:

```bash
curl -X POST http://localhost:5000/api/admin/register -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"email\":\"admin@diablo.com\",\"password\":\"admin123\"}"
```

Or use Postman:
- POST `http://localhost:5000/api/admin/register`
- Body: `{"username":"admin","email":"admin@diablo.com","password":"admin123"}`

## Access Your App

- 🌐 **Website:** http://localhost:3000
- 👤 **Admin Panel:** http://localhost:3000/admin/login
- 🔧 **API:** http://localhost:5000/api

## What's Already Done

✅ MongoDB connection configured  
✅ All backend routes and controllers  
✅ All frontend pages and components  
✅ Admin panel ready  
✅ Shopping cart system  
✅ Checkout flow  

**Just install and run!** 🎉

---

For detailed instructions, see `INSTALL.md` or `QUICK_START.md`



