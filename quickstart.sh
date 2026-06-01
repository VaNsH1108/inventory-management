#!/bin/bash

# Inventory & Order Management System - Quick Start Script
# This script automates the setup and startup process

set -e

echo "=================================="
echo "  Inventory Management System"
echo "  Quick Start Setup"
echo "=================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop."
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

echo "✅ Docker is installed and running"
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

echo "📦 Building Docker images..."
docker-compose build

echo ""
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo ""
echo "⏳ Waiting for services to start..."
sleep 10

# Check if all services are running
echo ""
echo "🔍 Checking service health..."

# Check backend
if curl -f http://localhost:8000/health &> /dev/null; then
    echo "✅ Backend API is running on http://localhost:8000"
else
    echo "❌ Backend API is not responding"
fi

# Check frontend
if curl -f http://localhost:3000 &> /dev/null; then
    echo "✅ Frontend is running on http://localhost:3000"
else
    echo "❌ Frontend is not responding"
fi

# Check database
if docker exec inventory_db pg_isready -U user &> /dev/null; then
    echo "✅ Database is running on localhost:5432"
else
    echo "❌ Database is not responding"
fi

echo ""
echo "=================================="
echo "  🎉 Setup Complete!"
echo "=================================="
echo ""
echo "📱 Access the application:"
echo "  • Frontend: http://localhost:3000"
echo "  • Backend API: http://localhost:8000"
echo "  • API Documentation: http://localhost:8000/docs"
echo ""
echo "🔧 Useful commands:"
echo "  • docker-compose logs -f          View logs"
echo "  • docker-compose down             Stop services"
echo "  • docker-compose down -v          Stop and remove data"
echo ""
echo "📚 Documentation:"
echo "  • SETUP.md       - Detailed setup guide"
echo "  • DEPLOYMENT.md  - Deployment instructions"
echo "  • API_REFERENCE.md - API documentation"
echo ""
