# DIABLO E-commerce Platform - MERN Stack

A full-stack e-commerce platform built with MongoDB, Express, React, and Node.js for selling shoe cleaning and protection products.

## Features

- 🛍️ **Product Catalog** - Browse and view detailed product information
- 🛒 **Shopping Cart** - Add, update, and remove items from cart
- 💳 **Checkout** - Complete order process with shipping and payment
- 👤 **Admin Panel** - Manage products, view orders, and upload images
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Beautiful dark theme with Tailwind CSS

## Project Structure

```
.
├── backend/          # Express.js API server
│   ├── controllers/  # Business logic
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/   # Auth middleware
│   └── server.js     # Entry point
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context
│   │   └── utils/      # Utilities and API
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
1. Double-click `setup-env.bat` to create environment files
2. Double-click `start.bat` to install dependencies and start servers

**Mac/Linux:**
```bash
chmod +x setup-env.sh start.sh
./setup-env.sh
./start.sh
```

### Option 2: Manual Setup

1. **Create environment files:**
   - **Windows:** Run `setup-env.bat`
   - **Mac/Linux:** Run `./setup-env.sh`
   - **Or manually:** Copy the content below

2. **Install dependencies:**
```bash
npm run install-all
```

3. **Start servers:**

**Terminal 1 - Backend:**
```bash
npm run dev-backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev-frontend
```

### Environment Files

**backend/.env** (already configured with your MongoDB):
```env
PORT=5000
MONGODB_URI=mongodb+srv://nader:na123456789@achref.g1rxg8d.mongodb.net/diablo?retryWrites=true&w=majority&appName=achref
JWT_SECRET=diablo-secret-key-2025-change-in-production
NODE_ENV=development
```

**frontend/.env:**
```env
VITE_API_URL=http://localhost:5000/api
```

> 💡 **Note:** The `.env` files are already configured! Just run the setup scripts or create them manually.

## 🔐 Create Admin Account

After starting the backend, create your first admin account:

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"email\":\"admin@diablo.com\",\"password\":\"admin123\"}"
```

**Using Postman/Thunder Client:**
- Method: `POST`
- URL: `http://localhost:5000/api/admin/register`
- Body (JSON):
```json
{
  "username": "admin",
  "email": "admin@diablo.com",
  "password": "admin123"
}
```

Then login at: http://localhost:3000/admin/login

## Usage

1. **Browse Products**: Visit `/products` to see all available products
2. **View Product Details**: Click on any product to see full details
3. **Add to Cart**: Add products to your shopping cart
4. **Checkout**: Complete your order with shipping and payment information
5. **Admin Panel**: Visit `/admin/login` to manage products and orders

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart?sessionId=xxx` - Get cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove cart item
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Admin register
- `GET /api/admin/profile` - Get admin profile

### Upload
- `POST /api/upload` - Upload image (Admin)

## Technologies Used

### Backend
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- Multer - File uploads
- bcryptjs - Password hashing

### Frontend
- React - UI library
- React Router - Routing
- Axios - HTTP client
- Tailwind CSS - Styling
- Lucide React - Icons
- Vite - Build tool

## Production Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Set environment variables for production
3. Use a process manager like PM2 for the backend
4. Serve the frontend build with a static file server or integrate with the backend

## License

MIT

