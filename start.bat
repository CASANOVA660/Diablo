@echo off
echo ====================================
echo DIABLO E-commerce Platform
echo ====================================
echo.

echo Checking environment files...
if not exist "backend\.env" (
    echo Creating backend/.env...
    call setup-env.bat
)

echo Checking if node_modules exist...
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo Starting backend server...
start "DIABLO Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting frontend server...
start "DIABLO Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ====================================
echo Servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin Panel: http://localhost:3000/admin/login
echo ====================================
echo.
echo Press any key to exit...
pause >nul

