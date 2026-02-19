@echo off
echo ==========================================
echo      Sutrr Wellness - Vercel Setup
echo ==========================================
echo.

REM Add Node to PATH for this session
set PATH=%PATH%;C:\Program Files\nodejs

echo [STEP 1] Installing Vercel CLI...
echo This may take a moment...
call npm install -g vercel

echo.
echo ==========================================
echo      Vercel CLI Installed!
echo ==========================================
pause
