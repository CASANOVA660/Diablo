@echo off
echo Creating admin account directly in MongoDB...
echo.

cd backend
node -e "const mongoose = require('mongoose'); const Admin = require('./models/Admin.js').default; require('dotenv').config(); mongoose.connect(process.env.MONGODB_URI).then(async () => { const admin = new Admin({username:'achref',email:'achref@diablo.com',password:'ach123456789'}); await admin.save(); console.log('Admin created!'); process.exit(0); }).catch(e => {console.error(e); process.exit(1);});"

echo.
echo Admin created with:
echo Username: achref
echo Password: ach123456789
echo.
pause
