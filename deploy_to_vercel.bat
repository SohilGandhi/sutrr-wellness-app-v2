@echo off
echo ==========================================
echo      Sutrr Wellness - Vercel Deployment
echo ==========================================
echo.

REM Add Node to PATH for this session (needed for npm/vercel)
set PATH=%PATH%;C:\Program Files\nodejs

REM Check if Vercel CLI is installed
call vercel --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Vercel CLI not found. Installing now...
    call npm install -g vercel
)

echo [STEP 1] Authenticating with Vercel...
echo You will be asked to log in via browser.
call vercel login

echo.
echo [STEP 2] Deploying to Production...
echo.
REM Deploy with --prod flag for production URL
call vercel --prod

echo.
echo ==========================================
echo      Deployment Complete!
echo      Share the Production URL below.
echo ==========================================
pause
