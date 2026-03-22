@echo off
REM BikeRental - Quick Setup Script for Windows

setlocal enabledelayedexpansion

echo.
echo ========================================
echo BikeRental - Full Stack Setup
echo ========================================
echo.

REM Check if Docker is available
docker --version > nul 2>&1
if errorlevel 1 (
    echo [!] Docker is not installed or not in PATH
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    echo.
    set /p USE_DOCKER="Would you like to continue without Docker (y/n)? "
    if /i not "!USE_DOCKER!"=="y" exit /b 1
    set DOCKER_AVAILABLE=0
) else (
    echo [+] Docker found
    set DOCKER_AVAILABLE=1
)

echo.
echo ========================================
echo Select Setup Type:
echo ========================================
echo 1. Docker Compose (All in one - Recommended)
echo 2. Local Development (Manual setup)
echo 3. Backend Only
echo 4. Frontend Only
echo.
set /p SETUP_TYPE="Enter choice (1-4): "

if "%SETUP_TYPE%"=="1" goto docker_setup
if "%SETUP_TYPE%"=="2" goto local_setup
if "%SETUP_TYPE%"=="3" goto backend_only
if "%SETUP_TYPE%"=="4" goto frontend_only
goto invalid_choice

:docker_setup
if "%DOCKER_AVAILABLE%"=="0" (
    echo [!] Docker is required for this option
    goto end
)
echo.
echo [*] Starting Docker Compose setup...
echo.
cd /d "%~dp0"
docker-compose down
docker-compose up -d
echo.
echo [+] Setup complete!
echo.
echo Access your application:
echo   Frontend:  http://localhost:3000
echo   Backend:   http://localhost:8080/api
echo   Database:  localhost:3306
echo.
echo To stop: docker-compose down
echo To view logs: docker-compose logs -f
goto end

:local_setup
echo.
echo [*] Local Development Setup
echo.
echo Prerequisites required:
echo   - Java 17+
echo   - Maven 3.8+
echo   - Node.js 16+
echo   - MySQL 8.0
echo.
set /p CONTINUE="Press Enter to continue..."
echo.
echo [*] Setting up Backend...
cd /d "%~dp0\bikerental-java-backend"
call mvn clean install
if errorlevel 1 (
    echo [!] Backend build failed
    goto end
)
echo.
echo [*] Setting up Frontend...
cd /d "%~dp0\bikerental-react-frontend"
call npm install
if errorlevel 1 (
    echo [!] Frontend setup failed
    goto end
)
echo.
echo [+] Setup complete!
echo.
echo Next steps:
echo.
echo 1. Start Backend (Terminal 1):
echo    cd bikerental-java-backend
echo    mvn spring-boot:run
echo.
echo 2. Start Frontend (Terminal 2):
echo    cd bikerental-react-frontend
echo    npm start
echo.
echo 3. Access: http://localhost:3000
goto end

:backend_only
echo.
echo [*] Backend Only Setup
echo.
cd /d "%~dp0\bikerental-java-backend"
call mvn clean install
if errorlevel 1 (
    echo [!] Backend build failed
    goto end
)
echo.
echo [+] Backend setup complete!
echo.
echo To start:
echo   cd bikerental-java-backend
echo   mvn spring-boot:run
echo.
echo Backend will run on: http://localhost:8080/api
goto end

:frontend_only
echo.
echo [*] Frontend Only Setup
echo.
cd /d "%~dp0\bikerental-react-frontend"
call npm install
if errorlevel 1 (
    echo [!] Frontend setup failed
    goto end
)
echo.
echo [+] Frontend setup complete!
echo.
echo To start:
echo   cd bikerental-react-frontend
echo   npm start
echo.
echo Frontend will run on: http://localhost:3000
goto end

:invalid_choice
echo [!] Invalid choice. Exiting.
goto end

:end
echo.
pause
