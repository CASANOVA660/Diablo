@echo off
echo Building frontend for Hostinger...
cd /d "%~dp0frontend"
call npm run build
if errorlevel 1 (
  echo Build failed.
  exit /b 1
)
echo.
echo Done. Upload the contents of: frontend\dist
echo And copy public_html_htaccess to public_html as .htaccess
echo See DEPLOY_HOSTINGER.md for full steps.
pause
