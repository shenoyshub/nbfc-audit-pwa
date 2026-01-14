@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

echo ================================
echo     PWA → APK AUTOMATION
echo ================================

:: -------- CONFIG --------
SET APP_NAME=AuditDemo
SET APP_ID=com.company.auditdemo
SET WEB_DIR=dist/your-app-name
:: ------------------------

:: Step 0: Check Node.js
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Install Node.js first.
    pause
    exit /b
)

:: Step 1: Build Angular PWA
echo 🔧 Building Angular PWA...
ng build --configuration production
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Angular build failed.
    pause
    exit /b
)

:: Step 2: Install Capacitor packages if missing
npm list @capacitor/core >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Installing Capacitor...
    npm install @capacitor/core @capacitor/cli --save-dev
)

:: Step 3: Initialize Capacitor (only if capacitor.config.json not exists)
IF NOT EXIST capacitor.config.json (
    echo Initializing Capacitor...
    npx cap init %APP_NAME% %APP_ID% --web-dir=%WEB_DIR%
) ELSE (
    echo Capacitor already initialized.
)

:: Step 4: Add Android platform (only if android folder not exists)
IF NOT EXIST android (
    echo Adding Android platform...
    npx cap add android
) ELSE (
    echo Android platform already exists.
)

:: Step 5: Copy web assets
echo Copying Angular build to Android...
npx cap copy

:: Step 6: Open Android Studio
echo Opening Android Studio...
npx cap open android

echo ================================
echo ✅ DONE! Build opened in Android Studio.
echo Build APK from Build → Build Bundle(s) / APK(s)
echo ================================
pause
