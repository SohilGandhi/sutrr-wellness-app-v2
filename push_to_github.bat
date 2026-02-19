@echo off
echo ==========================================
echo      Sutrr Wellness - GitHub Push Setup
echo ==========================================
echo.

REM Add Git to PATH just for this session
set PATH=%PATH%;C:\Program Files\Git\cmd

REM Check if gh is installed
if exist "C:\Program Files\GitHub CLI\gh.exe" (
    set GH_CMD="C:\Program Files\GitHub CLI\gh.exe"
) else (
    echo [ERROR] GitHub CLI not found at expected path.
    echo Please ensure GitHub CLI is installed.
    pause
    exit /b
)

echo [STEP 1] Checking Authentication...
REM Check status first
%GH_CMD% auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo You are NOT logged in to the GitHub CLI.
    echo Please follow the browser login steps now:
    %GH_CMD% auth login -p https -w
) else (
    echo You are already logged in!
)

echo.
echo [STEP 2] Creating Repository & Pushing Code...
echo We will create/push to repository: 'sutrr-wellness-app-v2'
echo.

REM Try to create; if it fails (already exists), we just push.
%GH_CMD% repo create sutrr-wellness-app-v2 --public --source=. --remote=origin --push >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Repo might already exist or push failed. Trying manual push...
    git push -u origin main
)

echo.
echo ==========================================
echo      DONE! Check your GitHub profile.
echo ==========================================
pause
