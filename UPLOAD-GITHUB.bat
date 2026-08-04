@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ========================================
echo  Upload Wedding Site to GitHub
echo  Repo: bassamr430-alt/wedding-invitation
echo ========================================
echo.
echo Files to upload manually on GitHub.com:
echo   - index.html
echo   - style.css
echo   - script.js
echo   - assets/images/basmala.png
echo.
echo Steps:
echo   1. Open https://github.com/bassamr430-alt/wedding-invitation
echo   2. Click each file ^> Edit (pencil) ^> paste new content ^> Commit
echo   3. For basmala.png: Add file ^> upload assets/images/basmala.png
echo   4. Wait 1-2 minutes, then open site with cache cleared
echo.
echo Local folder: %~dp0
echo.
pause
