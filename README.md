# Inventory & Order Management System

A comprehensive full-stack application for managing products, customers, and orders. The system is fully containerized with Docker and ready for deployment.

## 🎯 Features

### Product Management
- Create, read, update, and delete products
- Track inventory levels
- Unique SKU codes
- Automatic low-stock alerts

### Customer Management
- Create and manage customer profiles
- Unique email validation
- Contact information tracking

### Order Management
- Create orders with multiple items
- Automatic inventory deduction
- Automatic total calculation
- Order cancellation and inventory restoration
- Order history and tracking

### Dashboard
- Real-time statistics
- Total products, customers, and orders
- Total revenue calculation
- Low-stock product warnings

## 🏗️ Architecture

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Validation**: Pydantic

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Notifications**: React Toastify

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Database**: PostgreSQL 15

## 📋 Prerequisites

- Docker Desktop (includes Docker and Docker Compose)
- Git
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

## 🚀 Quick Start

### Using Docker Compose (Recommended)

1. **Clone the repository** (after pushing to GitHub)
   ```bash
   git clone <repository-url>
   cd Ethara\ Product\ System
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Local Development

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with database configuration
# Edit .env with your database credentials

# Run migrations and start server
uvicorn main:app --reload --port 8000
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file with API URL
echo "REACT_APP_API_URL=http://localhost:8000" > .env

# Start development server
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:8000
```

### Products Endpoints
- `POST /products` - Create a new product
- `GET /products` - Get all products
- `GET /products/{id}` - Get product details
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Customers Endpoints
- `POST /customers` - Create a new customer
- `GET /customers` - Get all customers
- `GET /customers/{id}` - Get customer details
- `DELETE /customers/{id}` - Delete customer

### Orders Endpoints
- `POST /orders` - Create a new order
- `GET /orders` - Get all orders
- `GET /orders/{id}` - Get order details
- `DELETE /orders/{id}` - Cancel order

### Dashboard Endpoint
- `GET /dashboard` - Get dashboard statistics

### Health Check
- `GET /health` - Server health status
- `GET /` - API information

## 🗂️ Project Structure

```
Ethara Product System/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database models & configuration
│   ├── schemas.py           # Pydantic schemas
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile           # Backend Docker image
│   ├── .dockerignore        # Docker ignore rules
│   └── .env                 # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── App.js           # Main App component
│   │   ├── App.css          # Global styles
│   │   ├── api.js           # API client
│   │   ├── index.js         # React entry point
│   │   └── pages/           # Page components
│   │       ├── Dashboard.js
│   │       ├── ProductsPage.js
│   │       ├── CustomersPage.js
│   │       └── OrdersPage.js
│   ├── package.json         # Node dependencies
│   ├── Dockerfile           # Frontend Docker image
│   ├── .dockerignore        # Docker ignore rules
│   └── .env                 # Environment variables
├── docker-compose.yml       # Docker Compose configuration
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```
DATABASE_URL=postgresql://user:password@db:5432/inventory_db
FRONTEND_URL=http://localhost:3000
DEBUG=False
```

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
```

## 📝 Business Logic Implementation

✅ **Product SKU uniqueness** - Enforced at database and API level
✅ **Customer email uniqueness** - Enforced at database and API level
✅ **Inventory validation** - No negative quantities
✅ **Stock availability check** - Orders fail if insufficient inventory
✅ **Automatic inventory deduction** - Applied when order is created
✅ **Order total calculation** - Computed automatically by backend
✅ **Error handling** - Comprehensive validation and error messages
✅ **HTTP status codes** - Proper status codes for all responses

## 🐳 Docker Commands

### Build Images
```bash
docker-compose build
```

### Start Services
```bash
docker-compose up
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Access Database
```bash
docker exec -it inventory_db psql -U user -d inventory_db
```

## 🌐 Deployment

### Backend Deployment (Render/Railway/Fly.io)

1. **Prepare for deployment**
   - Update DATABASE_URL with production database
   - Set FRONTEND_URL to production frontend URL
   - Set DEBUG=False

2. **Deploy to Render**
   ```
   - Create new Web Service
   - Connect GitHub repository
   - Set build command: pip install -r requirements.txt
   - Set start command: uvicorn main:app --host 0.0.0.0 --port 8000
   - Add environment variables
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Deploy to Vercel**
   ```
   - Connect GitHub repository
   - Set build command: npm run build
   - Set output directory: build
   - Add environment variable: REACT_APP_API_URL=<production-backend-url>
   ```

2. **Deploy to Netlify**
   ```
   - Connect GitHub repository
   - Set build command: npm run build
   - Set publish directory: build
   - Add environment variable: REACT_APP_API_URL=<production-backend-url>
   ```

## 📦 Building Docker Images for Docker Hub

```bash
# Build backend image
docker build -t yourusername/inventory-backend:1.0.0 ./backend

# Build frontend image
docker build -t yourusername/inventory-frontend:1.0.0 ./frontend

# Push to Docker Hub
docker push yourusername/inventory-backend:1.0.0
docker push yourusername/inventory-frontend:1.0.0
```

## 🧪 Testing

### Test Product Creation
```bash
curl -X POST "http://localhost:8000/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "sku": "TEST001",
    "price": 99.99,
    "quantity": 100
  }'
```

### Test Order Creation
```bash
curl -X POST "http://localhost:8000/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": 1,
    "order_items": [
      {
        "product_id": 1,
        "quantity": 5
      }
    ]
  }'
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL service is running
- Check DATABASE_URL format
- Verify credentials in .env

### Frontend API Connection Issues
- Ensure backend is running on correct port
- Check REACT_APP_API_URL in .env
- Clear browser cache and cookies

### Docker Build Issues
- Clear Docker cache: `docker system prune`
- Rebuild images: `docker-compose build --no-cache`

## 📄 Submission Checklist

- [ ] GitHub repository created with all code
- [ ] Backend Dockerfile optimized for production
- [ ] Frontend Dockerfile configured for React
- [ ] Docker Compose properly configured
- [ ] Environment variables properly managed
- [ ] All API endpoints implemented and tested
- [ ] Frontend UI is responsive and functional
- [ ] Backend deployed to cloud platform (Render/Railway/Fly.io)
- [ ] Frontend deployed to CDN (Vercel/Netlify)
- [ ] Docker images pushed to Docker Hub
- [ ] All URLs are public and accessible

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation at `/docs`
3. Check container logs with `docker-compose logs`

## 📄 License

This project is provided as-is for educational purposes.

---

**Version**: 1.0.0  
**Last Updated**: June 2026
