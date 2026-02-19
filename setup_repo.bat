@echo off
echo ==========================================
echo      Sutrr Wellness - Git Setup Script
echo ==========================================
echo.

WHERE git >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/download/win
    echo After installing, restart this script.
    pause
    exit /b
)

echo [1/4] Initializing Git Repository...
git init

echo [2/4] Adding Files (Ignoring PDFs/node_modules)...
git add .

echo [3/4] Committing Code...
git commit -m "Initial commit: Sutrr Wellness V2 - Mobile Responsive Prototype"

echo.
echo ==========================================
echo      Repository Setup Complete!
echo ==========================================
echo.
echo To push to GitHub, run these commands manually:
echo   1. Create a repo on GitHub.com
echo   2. git remote add origin <YOUR_REPO_URL>
echo   3. git branch -M main
echo   4. git push -u origin main
echo.
pause
