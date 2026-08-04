@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  Wedding Invitation - Local Preview
echo  Open on phone: http://YOUR-PC-IP:8080
echo.
npx --yes serve -l tcp://0.0.0.0:8080
pause
