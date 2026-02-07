@echo off
echo Creating .env files...

REM Create backend .env
(
echo PORT=5000
echo MONGODB_URI=mongodb+srv://nader:na123456789@achref.g1rxg8d.mongodb.net/diablo?retryWrites=true^&w=majority^&appName=achref
echo JWT_SECRET=diablo-secret-key-2025-change-in-production
echo NODE_ENV=development
) > backend\.env
echo ✅ Created backend/.env

REM Create frontend .env
(
echo VITE_API_URL=http://localhost:5000/api
) > frontend\.env
echo ✅ Created frontend/.env

echo.
echo 🎉 Environment files created successfully!
echo.
pause



