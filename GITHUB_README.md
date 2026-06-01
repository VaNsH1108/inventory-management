# 🏆 Inventory & Order Management System - Complete Docker Implementation

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Python](https://img.shields.io/badge/python-3.11+-blue)
![React](https://img.shields.io/badge/react-18.2+-blue)
![Docker](https://img.shields.io/badge/docker-latest-blue)
![PostgreSQL](https://img.shields.io/badge/postgresql-15-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A comprehensive full-stack application for managing products, customers, and orders with a complete Docker containerization setup ready for production deployment.

## 🌟 Features

### ✅ Product Management
- Create, read, update, and delete products
- Unique SKU/code management
- Real-time inventory tracking
- Low-stock alerts (< 10 units)

### ✅ Customer Management
- Create and manage customer profiles
- Unique email validation
- Contact information management

### ✅ Order Management
- Create orders with multiple items
- Automatic inventory deduction
- Order history and tracking
- Order cancellation with inventory restoration

### ✅ Dashboard
- Real-time statistics
- Total products, customers, and orders
- Total revenue calculation
- Low-stock product alerts

### ✅ Full Docker Support
- Multi-container orchestration
- Production-ready configurations
- Docker Hub image support
- Cloud deployment ready

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│              React Frontend (Port 3000)              │
├─────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────┐  │
│  │   FastAPI Backend (Port 8000)                  │  │
│  │  - Product Management                          │  │
│  │  - Customer Management                         │  │
│  │  - Order Management                            │  │
│  │  - Dashboard Stats                             │  │
│  └────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│    PostgreSQL Database (Port 5432)                   │
│    - Persistent Data Storage                         │
│    - Automatic Backups Support                       │
└─────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18, React Router, Axios |
| **Backend** | FastAPI, Python 3.11, Uvicorn |
| **Database** | PostgreSQL 15 |
| **Containerization** | Docker, Docker Compose |
| **API Documentation** | Swagger UI (Interactive) |

## 📦 Docker Images

### Published on Docker Hub

```bash
# Backend Image
docker pull yourusername/inventory-backend:latest

# Frontend Image
docker pull yourusername/inventory-frontend:latest
```

## 🚀 Quick Start

### Prerequisites
- Docker Desktop (v20.10+)
- Git
- 2GB RAM minimum

### Installation (5 minutes)

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/inventory-management.git
cd inventory-management
```

2. **Start Services**
```bash
docker-compose up --build
```

3. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Project overview and features |
| [SETUP.md](SETUP.md) | Detailed setup and development guide |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Cloud deployment instructions |
| [API_REFERENCE.md](API_REFERENCE.md) | Complete API documentation |

## 🔗 API Endpoints

### Products
```
POST   /products              # Create product
GET    /products              # List all products
GET    /products/{id}         # Get product details
PUT    /products/{id}         # Update product
DELETE /products/{id}         # Delete product
```

### Customers
```
POST   /customers             # Create customer
GET    /customers             # List all customers
GET    /customers/{id}        # Get customer details
DELETE /customers/{id}        # Delete customer
```

### Orders
```
POST   /orders                # Create order
GET    /orders                # List all orders
GET    /orders/{id}           # Get order details
DELETE /orders/{id}           # Cancel order
```

### Dashboard
```
GET    /dashboard             # Get statistics
GET    /health                # Health check
GET    /                      # API info
```

## 🗂️ Project Structure

```
inventory-management/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database models
│   ├── schemas.py           # Data schemas
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile           # Backend image
│   └── .env                 # Configuration
├── frontend/
│   ├── src/
│   │   ├── App.js           # Main component
│   │   ├── api.js           # API client
│   │   └── pages/           # Page components
│   ├── package.json         # Dependencies
│   ├── Dockerfile           # Frontend image
│   └── .env                 # Configuration
├── docker-compose.yml       # Service orchestration
├── docker-compose.prod.yml  # Production config
└── README.md               # This file
```

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f backend

# Reset database
docker-compose down -v
docker-compose up --build

# Access database
docker exec -it inventory_db psql -U user -d inventory_db

# Build images for Docker Hub
docker build -t yourusername/inventory-backend:1.0.0 ./backend
docker build -t yourusername/inventory-frontend:1.0.0 ./frontend

# Push to Docker Hub
docker push yourusername/inventory-backend:1.0.0
docker push yourusername/inventory-frontend:1.0.0
```

## ☁️ Cloud Deployment

### Backend Options
- **Render** - Easy deployment, free tier available
- **Railway** - Git-based deployment
- **Fly.io** - Global deployment

### Frontend Options
- **Vercel** - Optimized for React, free tier
- **Netlify** - Easy deployments, good performance

### Detailed Instructions
See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step deployment guides.

## 🔐 Security Features

✅ **Environment Variables** - No hardcoded credentials
✅ **CORS Configuration** - Controlled cross-origin access
✅ **Input Validation** - Pydantic schemas
✅ **Password Protection** - Database authentication
✅ **Unique Constraints** - SKU and email uniqueness
✅ **Error Handling** - Secure error messages

## 📊 Business Logic

✅ Product SKU must be unique
✅ Customer email must be unique
✅ Product quantity cannot be negative
✅ Orders cannot exceed available inventory
✅ Order totals calculated automatically
✅ Inventory reduced on order creation
✅ Inventory restored on order cancellation

## 🧪 Testing

### Test Product Creation
```bash
curl -X POST http://localhost:8000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","sku":"LAP001","price":999.99,"quantity":50}'
```

### Test Order Creation
```bash
curl -X POST http://localhost:8000/orders \
  -H "Content-Type: application/json" \
  -d '{"customer_id":1,"order_items":[{"product_id":1,"quantity":2}]}'
```

### Interactive Testing
Visit http://localhost:8000/docs for interactive API documentation

## 📈 Performance

- **Database**: PostgreSQL with connection pooling
- **API**: FastAPI with async support
- **Frontend**: React with optimization
- **Caching**: Browser caching enabled
- **Compression**: Gzip compression support

## 🐛 Troubleshooting

### Docker Issues
```bash
# Clear Docker cache
docker system prune

# Rebuild without cache
docker-compose build --no-cache
```

### Database Issues
```bash
# Reset database
docker-compose down -v
docker-compose up --build
```

### Port Conflicts
- Frontend: 3000
- Backend: 8000
- Database: 5432

Modify `docker-compose.yml` if ports are in use.

## 📝 Development

### Local Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Local Frontend Development
```bash
cd frontend
npm install
npm start
```

## 🚀 Production Checklist

- [ ] Pushed code to GitHub
- [ ] Built Docker images
- [ ] Pushed images to Docker Hub
- [ ] Configured environment variables
- [ ] Set up database
- [ ] Deployed backend
- [ ] Deployed frontend
- [ ] Tested all functionality
- [ ] Verified URLs are accessible
- [ ] Set up monitoring/logging

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

Created as a comprehensive technical assessment project.

## 🔗 Live Deployment

- **Frontend**: [Your Frontend URL]
- **Backend**: [Your Backend URL]
- **API Docs**: [Your Backend URL]/docs

## 📞 Support

For detailed documentation, see:
- [SETUP.md](SETUP.md) - Setup instructions
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [API_REFERENCE.md](API_REFERENCE.md) - API documentation

## 📊 Stats

- **Lines of Code**: 1000+
- **API Endpoints**: 15+
- **Components**: 10+
- **Services**: 3 (Frontend, Backend, Database)

## ✨ Future Enhancements

- [ ] User authentication & authorization
- [ ] Advanced reporting & analytics
- [ ] Inventory forecasting
- [ ] Email notifications
- [ ] Mobile app
- [ ] Real-time updates with WebSockets
- [ ] Multi-warehouse support
- [ ] Payment integration

---

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Updated**: June 2026

Made with ❤️ by [Your Name]
