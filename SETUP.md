# Setup & Development Guide

This guide will help you set up the Inventory & Order Management System for local development and testing.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop** (includes Docker and Docker Compose)
  - Download: https://www.docker.com/products/docker-desktop
  - Version: Latest stable

- **Git**
  - Download: https://git-scm.com/
  
- **Visual Studio Code** (Optional, recommended)
  - Download: https://code.visualstudio.com/

## Quick Start (5 minutes)

### 1. Clone/Download the Project

```bash
# If using Git
git clone <your-repository-url>
cd "Ethara Product System"

# Or extract the ZIP file and navigate to it
```

### 2. Start with Docker Compose

```bash
docker-compose up --build
```

Wait for all services to start. You should see messages like:
- `backend | Application startup complete`
- `frontend | The app is ready to be served`

### 3. Access the Application

Open your browser and navigate to:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

### 4. Verify Everything Works

1. In the frontend, click "Add Product"
2. Fill in the form:
   - Product Name: Test Product
   - SKU: TEST001
   - Price: 99.99
   - Quantity: 100
3. Click Create

If you see a success message, everything is working!

---

## Detailed Setup

### Option 1: Using Docker Compose (Recommended)

#### Step 1: Install Docker

1. Download Docker Desktop from https://www.docker.com/products/docker-desktop
2. Install and start Docker
3. Verify installation:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Step 2: Navigate to Project Directory

```bash
cd "Ethara Product System"
```

#### Step 3: Build and Start Services

```bash
# Build images and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

#### Step 4: View Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

#### Step 5: Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (careful: this deletes data)
docker-compose down -v
```

---

### Option 2: Local Development Setup

#### Backend Setup

##### Step 1: Install Python

- Download Python 3.11+ from https://www.python.org/downloads/
- Verify installation: `python --version`

##### Step 2: Create Virtual Environment

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

##### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

##### Step 4: Set Up Database

```bash
# You need a PostgreSQL server running
# Option A: Use Docker for just the database
docker run -d \
  --name inventory_db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=inventory_db \
  -p 5432:5432 \
  postgres:15-alpine

# Option B: Install PostgreSQL locally
# Download from https://www.postgresql.org/download/
```

##### Step 5: Configure Environment

Create `.env` file in the backend directory:

```
DATABASE_URL=postgresql://user:password@localhost:5432/inventory_db
FRONTEND_URL=http://localhost:3000
DEBUG=True
```

##### Step 6: Start Backend Server

```bash
uvicorn main:app --reload --port 8000
```

The backend will start at http://localhost:8000

---

#### Frontend Setup

##### Step 1: Install Node.js

- Download from https://nodejs.org/
- LTS version recommended
- Verify: `node --version` and `npm --version`

##### Step 2: Install Dependencies

```bash
cd frontend
npm install
```

##### Step 3: Configure Environment

Create `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:8000
```

##### Step 4: Start Development Server

```bash
npm start
```

The frontend will open at http://localhost:3000

---

## Common Tasks

### View Logs

```bash
# Docker Compose
docker-compose logs -f backend

# Local development
# Terminal automatically shows logs when running `npm start` or `uvicorn`
```

### Access Database

```bash
# Via Docker
docker exec -it inventory_db psql -U user -d inventory_db

# Via local PostgreSQL
psql -U user -d inventory_db
```

### Reset Database

```bash
# Remove containers and volumes
docker-compose down -v

# Recreate and start
docker-compose up --build
```

### Rebuild Docker Images

```bash
docker-compose build --no-cache
```

### Check Running Containers

```bash
docker-compose ps
```

### Stop Specific Service

```bash
docker-compose stop backend
docker-compose stop frontend
docker-compose stop db
```

---

## Testing the API

### Using cURL

```bash
# Health Check
curl http://localhost:8000/health

# Get all products
curl http://localhost:8000/products

# Create a product
curl -X POST http://localhost:8000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "sku": "LAP001",
    "price": 999.99,
    "quantity": 50
  }'

# Create a customer
curl -X POST http://localhost:8000/customers \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234"
  }'

# Create an order
curl -X POST http://localhost:8000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": 1,
    "order_items": [
      {
        "product_id": 1,
        "quantity": 2
      }
    ]
  }'
```

### Using API Documentation

1. Open http://localhost:8000/docs
2. You'll see the interactive API documentation
3. Click on any endpoint to expand it
4. Click "Try it out"
5. Fill in the parameters
6. Click "Execute"

---

## Troubleshooting

### Issue: "Cannot connect to Docker daemon"

**Solution:**
- Ensure Docker Desktop is running
- On Linux, ensure Docker service is started: `sudo systemctl start docker`

### Issue: Port 3000 or 8000 already in use

**Solution:**
```bash
# Find what's using the port
# On Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess

# Kill the process or use different ports in docker-compose.yml
```

### Issue: Database connection refused

**Solution:**
- Check if PostgreSQL container is running: `docker-compose ps`
- Wait 10-15 seconds for database to start
- Check DATABASE_URL format in .env

### Issue: Frontend shows blank page

**Solution:**
- Open browser console (F12) and check for errors
- Ensure backend is running and accessible
- Check REACT_APP_API_URL in .env
- Clear browser cache: Ctrl+Shift+Delete (Windows/Linux) or Cmd+Shift+Delete (Mac)

### Issue: "react-scripts: command not found"

**Solution:**
```bash
cd frontend
npm install
```

### Issue: Python module not found

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

---

## Development Tips

### Hot Reload

- **Backend**: Changes automatically reload when using `uvicorn --reload`
- **Frontend**: Changes automatically reload in development mode

### Debug Mode

- **Backend**: Set `DEBUG=True` in .env
- **Frontend**: Open DevTools (F12) to use React DevTools

### Database Backup

```bash
# Create backup
docker exec inventory_db pg_dump -U user inventory_db > backup.sql

# Restore backup
docker exec -i inventory_db psql -U user inventory_db < backup.sql
```

### View Docker Images

```bash
docker images
```

### Remove Unused Docker Resources

```bash
docker system prune
```

---

## Next Steps

1. **Understand the Architecture**: Read [README.md](README.md)
2. **Deploy to Cloud**: Follow [DEPLOYMENT.md](DEPLOYMENT.md)
3. **Customize**: Modify code to add more features
4. **Test**: Create comprehensive test cases
5. **Deploy**: Push to GitHub and deploy to production

---

## Useful Resources

- FastAPI Documentation: https://fastapi.tiangolo.com/
- React Documentation: https://react.dev/
- Docker Documentation: https://docs.docker.com/
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Docker Compose: https://docs.docker.com/compose/

---

**Need help?** Check the troubleshooting section or review the README.md file.
