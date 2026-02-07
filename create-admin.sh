#!/bin/bash

echo "Creating admin account..."
echo ""

curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"username":"achref","email":"achref@diablo.com","password":"ach123456789"}'

echo ""
echo ""
echo "Admin credentials:"
echo "Username: achref"
echo "Password: ach123456789"
echo ""
echo "Login at: http://localhost:3000/admin/login"



