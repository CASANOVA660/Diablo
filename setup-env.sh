#!/bin/bash

echo "Creating .env files..."

# Create backend .env
cat > backend/.env << EOF
PORT=5000
MONGODB_URI=mongodb+srv://nader:na123456789@achref.g1rxg8d.mongodb.net/diablo?retryWrites=true&w=majority&appName=achref
JWT_SECRET=diablo-secret-key-2025-change-in-production
NODE_ENV=development
EOF
echo "✅ Created backend/.env"

# Create frontend .env
cat > frontend/.env << EOF
VITE_API_URL=http://localhost:5000/api
EOF
echo "✅ Created frontend/.env"

echo ""
echo "🎉 Environment files created successfully!"



