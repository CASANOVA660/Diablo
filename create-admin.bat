@echo off
echo Creating admin account...
echo.

powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:5000/api/admin/register' -Method POST -Headers @{'Content-Type'='application/json'} -Body '{\"username\":\"achref\",\"email\":\"achref@diablo.com\",\"password\":\"ach123456789\"}' -ErrorAction Stop; Write-Host '✅ Admin account created successfully!' -ForegroundColor Green; $response.Content | ConvertFrom-Json | Out-Null } catch { if ($_.Exception.Response.StatusCode -eq 400) { Write-Host 'ℹ️  Admin account already exists' -ForegroundColor Yellow } else { Write-Host '❌ Error:' $_.Exception.Message -ForegroundColor Red; Write-Host 'Make sure the backend server is running on http://localhost:5000' -ForegroundColor Yellow } }"

echo.
echo Admin credentials:
echo Username: achref
echo Password: ach123456789
echo.
echo Login at: http://localhost:3000/admin/login
echo.
pause

