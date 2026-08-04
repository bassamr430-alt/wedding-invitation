@echo off
chcp 65001 >nul
title AMMAR ^& RANA — Wedding Site Server
cd /d "%~dp0"

echo.
echo  ═══════════════════════════════════════
echo   Wedding site — local preview
echo  ═══════════════════════════════════════
echo.
echo  Folder: %cd%
echo  URL:    http://localhost:8080
echo.
echo  Wait until you see: Accepting connections
echo  Keep this window OPEN. Ctrl+C to stop.
echo.

where.exe npx >nul 2>&1
if %errorlevel%==0 (
  echo  Starting server on port 8080...
  echo.
  start "" cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:8080"
  npx --yes serve -l tcp://0.0.0.0:8080
  goto :end
)

echo  ERROR: Node.js is not installed.
echo  Download from: https://nodejs.org
echo.
pause
:end
