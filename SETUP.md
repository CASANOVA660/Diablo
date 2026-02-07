# Setup Instructions

## Quick Start Guide

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/diablo
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

Start MongoDB (if using local):
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
# Start MongoDB service from Services
```

Start backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start frontend:
```bash
npm run dev
```

### 3. Create Admin Account

Option 1: Using curl
```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@diablo.com",
    "password": "admin123"
  }'
```

Option 2: Using MongoDB Compass or mongo shell
```javascript
// Connect to MongoDB and run:
use diablo
db.admins.insertOne({
  username: "admin",
  email: "admin@diablo.com",
  password: "$2a$10$..." // Use bcrypt to hash password
})
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Admin Panel: http://localhost:3000/admin/login

## Adding Initial Products

You can add products through the admin panel or directly in MongoDB:

```javascript
db.products.insertMany([
  {
    name: "Diablo Like New - Cleaning",
    description: "Professional 2-in-1 shoe cleaning kit",
    fullDescription: "Experience the ultimate shoe care with our DIABLO Like New complete cleaning system.",
    price: 29.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AC2-rePSsX5wJDvYwCNzx00iK4Vy51n7rn.jpg",
    badge: "2 in 1 - BEST SELLER",
    rating: 4.8,
    reviews: 127,
    features: [
      "Removes dirt, grime, and stains effectively",
      "Safe for all materials and colors",
      "Professional results at home"
    ],
    includes: ["Shoe Cleaner Spray", "Cleaning Foam", "Sneaker Brush", "Microfiber Cloth"],
    inStock: true
  },
  {
    name: "Shoe Cleaner",
    description: "Powerful spray cleaner for sneakers and casual shoes",
    fullDescription: "Our signature shoe cleaner spray tackles tough stains and dirt without damaging your favorite sneakers.",
    price: 14.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AC3-gVmIljm68LienrSbBO5egplNF1jk7p.jpg",
    rating: 4.7,
    reviews: 89,
    features: ["Powerful cleaning action", "Non-damaging formula", "Quick-drying"],
    inStock: true
  }
])
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in `.env` file
- For MongoDB Atlas, use connection string format: `mongodb+srv://user:pass@cluster.mongodb.net/diablo`

### Port Already in Use
- Change PORT in backend `.env` file
- Update frontend proxy in `vite.config.js` if needed

### CORS Issues
- Backend CORS is configured to allow all origins in development
- For production, update CORS settings in `backend/server.js`

### Admin Login Not Working
- Ensure admin account exists in database
- Check JWT_SECRET in `.env` file
- Verify password is correctly hashed



