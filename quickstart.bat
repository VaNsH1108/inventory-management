@echo off
REM Inventory & Order Management System - Quick Start Script (Windows)

setlocal enabledelayedexpansion

echo ==================================
echo   Inventory Management System
echo   Quick Start Setup
echo ==================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Docker is not installed. Please install Docker Desktop.
    echo Download from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo [OK] Docker is installed and running
echo.

REM Change to script directory
cd /d "%~dp0"

echo Building Docker images...
docker-compose build

echo.
echo Starting services...
docker-compose up -d

echo.
echo Waiting for services to start...
timeout /t 15 /nobreak

echo.
echo Checking service health...
echo.

REM Check backend
echo Checking Backend API...
curl -f http://localhost:8000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Backend API is running on http://localhost:8000
) else (
    echo [WARNING] Backend API is not responding yet
)

REM Check frontend
echo Checking Frontend...
curl -f http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Frontend is running on http://localhost:3000
) else (
    echo [WARNING] Frontend is not responding yet
)

REM Check database
echo Checking Database...
docker exec inventory_db pg_isready -U user >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Database is running on localhost:5432
) else (
    echo [WARNING] Database is not responding yet
)

echo.
echo ==================================
echo   Setup Complete!
echo ==================================
echo.
echo Access the application:
echo   * Frontend: http://localhost:3000
echo   * Backend API: http://localhost:8000
echo   * API Documentation: http://localhost:8000/docs
echo.
echo Useful commands:
echo   * docker-compose logs -f          View logs
echo   * docker-compose down             Stop services
echo   * docker-compose down -v          Stop and remove data
echo.
echo Documentation:
echo   * SETUP.md       - Detailed setup guide
echo   * DEPLOYMENT.md  - Deployment instructions
echo   * API_REFERENCE.md - API documentation
echo.

pause
