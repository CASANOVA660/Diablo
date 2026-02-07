@echo off
echo Creating backend/.env file...

(
echo PORT=5000
echo MONGODB_URI=mongodb+srv://nader:na123456789@achref.g1rxg8d.mongodb.net/achref?appName=achref
echo JWT_SECRET=diablo-secret-key-2025-change-in-production
echo NODE_ENV=development
) > backend\.env

echo.
echo ✅ backend/.env file created!
echo.
echo Please restart your backend server now.
echo.
pause



