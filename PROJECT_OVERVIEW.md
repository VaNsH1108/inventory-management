# Inventory & Order Management System – Complete Project Overview

## 🎯 What is this project?

This is a **full-stack web application** for managing inventory (products), customers, and orders. It's a production-ready system deployed on the cloud with a professional frontend, secure backend, and a database that persists all data.

**Live URLs:**
- **Frontend**: https://inventory-management-ijyz.vercel.app
- **Backend API**: https://inventory-backend-latest-8syt.onrender.com
- **API Documentation**: https://inventory-backend-latest-8syt.onrender.com/docs

---

## 📦 Architecture Overview

The system is built using a **3-tier architecture**:

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND (React + JavaScript)                          │
│  - Dashboard, Products, Customers, Orders pages         │
│  - Deployed on Vercel (auto-updates on code push)       │
└──────────────────┬──────────────────────────────────────┘
                   │ (HTTPS REST API calls)
                   ▼
┌─────────────────────────────────────────────────────────┐
│  BACKEND (FastAPI + Python)                             │
│  - 13 REST endpoints for CRUD operations                │
│  - Deployed on Render (auto-updates via Docker)         │
└──────────────────┬──────────────────────────────────────┘
                   │ (SQL queries)
                   ▼
┌─────────────────────────────────────────────────────────┐
│  DATABASE (PostgreSQL)                                  │
│  - Stores: Products, Customers, Orders, OrderItems     │
│  - Deployed on Render (persists data)                   │
└─────────────────────────────────────────────────────────┘
```

---

## 🏗️ Project Structure

```
e:\Ethara Product System/
├── backend/                    # Python/FastAPI backend
│   ├── main.py                # 13 API endpoints
│   ├── database.py            # Database models (SQLAlchemy)
│   ├── schemas.py             # Pydantic validation schemas
│   ├── requirements.txt        # Python dependencies
│   ├── Dockerfile             # Container configuration
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── App.js             # Main component
│   │   ├── api.js             # API client (calls backend)
│   │   ├── pages/             # Dashboard, Products, Customers, Orders pages
│   │   ├── App.css
│   │   ├── Dashboard.css
│   │   ├── Pages.css
│   ├── public/
│   │   ├── index.html
│   ├── package.json           # Node.js dependencies
│   ├── Dockerfile             # Container configuration
│
├── PROJECT_OVERVIEW.md        # This file
└── quickstart.sh / quickstart.bat  # Local development startup scripts
```

---

## 🔧 How It Works – User Perspective

### 1. **Dashboard Page**
- Shows summary: Total Products, Customers, Orders, Total Revenue
- Displays all data in real-time
- Updates when you create new items

### 2. **Products Page**
- View all products with name, SKU, price, quantity
- **Create Product**: Add new product (auto-checks for duplicate SKU)
- **Update Product**: Edit price or quantity
- **Delete Product**: Remove from inventory
- Products persist in the database

### 3. **Customers Page**
- View all customers with name, email, phone
- **Create Customer**: Add new customer (email must be unique)
- **Update Customer**: Edit contact info
- **Delete Customer**: Remove from system

### 4. **Orders Page**
- View all orders with customer name, product, quantity, total
- **Create Order**: 
  - Select a customer
  - Select a product
  - Enter quantity
  - System auto-deducts from inventory
  - Calculates total (price × quantity)
- **Delete Order**: Remove order and restore inventory quantity

---

## 🔌 How It Works – Technical Perspective

### Backend (Python/FastAPI)

**13 API Endpoints:**

#### Products
- `POST /products` – Create product
- `GET /products` – List all products
- `GET /products/{id}` – Get single product
- `PUT /products/{id}` – Update product
- `DELETE /products/{id}` – Delete product

#### Customers
- `POST /customers` – Create customer
- `GET /customers` – List all customers
- `GET /customers/{id}` – Get single customer
- `PUT /customers/{id}` – Update customer
- `DELETE /customers/{id}` – Delete customer

#### Orders
- `POST /orders` – Create order (auto-deducts inventory)
- `GET /orders` – List all orders
- `DELETE /orders/{id}` – Delete order (restores inventory)

#### Health Check
- `GET /health` – Returns `{"status": "healthy"}`

**Database Models:**
```python
Product:
  - id (auto-increment)
  - name (string)
  - sku (unique string)
  - price (float)
  - quantity (integer)
  - created_at, updated_at (timestamps)

Customer:
  - id (auto-increment)
  - full_name (string)
  - email (unique string)
  - phone (string)
  - created_at, updated_at (timestamps)

Order:
  - id (auto-increment)
  - customer_id (foreign key)
  - total_amount (float)
  - created_at, updated_at (timestamps)

OrderItem:
  - id (auto-increment)
  - order_id (foreign key)
  - product_id (foreign key)
  - quantity (integer)
  - price_at_purchase (float)
```

### Frontend (React/JavaScript)

**How it communicates:**
1. React components call `api.js`
2. `api.js` uses `fetch()` to make HTTPS requests to backend
3. Backend responds with JSON data
4. React updates the UI

**Key Components:**
- `App.js` – Main component, navigation
- `pages/Dashboard.js` – Summary stats
- `pages/ProductsPage.js` – Product CRUD
- `pages/CustomersPage.js` – Customer CRUD
- `pages/OrdersPage.js` – Order CRUD with inventory logic

---

## 🚀 Deployment Architecture

### Frontend Deployment (Vercel)
- Hosted on Vercel (static React app)
- **Auto-redeploys** when you push code to GitHub `main` branch
- Environment variable: `REACT_APP_API_URL` = backend URL

### Backend Deployment (Render)
- Deployed as a **Docker container** on Render
- **Docker image** stored on Docker Hub: `vansh1108/inventory-backend:latest`
- **Auto-redeploys** when you manually trigger "Deploy" on Render (or when image is updated)
- Environment variables:
  - `DATABASE_URL` = PostgreSQL connection string
  - `DEBUG` = False

### Database Deployment (Render PostgreSQL)
- Managed PostgreSQL database on Render
- **Free tier**: 1GB storage
- Connection string format: `postgresql://dbuser:PASSWORD@hostname.postgres.render.com:5432/inventory_db_sq3n`
- Data persists automatically

---

## 🔄 Deployment Flow

### Local Development → Production

```
1. You modify code locally (e.g., backend/main.py)
2. Run: git add . && git commit -m "message" && git push origin main
3. GitHub receives your code
4. Vercel detects changes → auto-redeploys frontend (2-3 min)
5. For backend changes:
   - Run: docker build -t vansh1108/inventory-backend:latest ./backend
   - Run: docker push vansh1108/inventory-backend:latest
   - Go to Render dashboard → Manual Deploy
   - Render pulls new image → redeploys (2-3 min)
6. Both frontend & backend are now live with your changes
```

---

## 🐛 Common Issues & Fixes

### "Failed to create product"
**Cause**: CORS error (frontend can't talk to backend)  
**Fix**: Update CORS origins in `backend/main.py` with your Vercel URL with `https://` prefix

### "Can't add customer/order"
**Cause**: Database connection failed  
**Fix**: Check `DATABASE_URL` env var in Render backend service settings

### Frontend shows blank page
**Cause**: `REACT_APP_API_URL` not set or wrong  
**Fix**: Verify Vercel environment variables → `REACT_APP_API_URL` = backend URL

### Backend returns 502 Bad Gateway
**Cause**: Container crashed or database offline  
**Fix**: Check Render logs → Render dashboard → service → Logs tab

---

## 📊 Data Flow Example: Creating an Order

```
User clicks "Create Order" on frontend
        ↓
Selects: Customer (John), Product (Laptop), Quantity (2)
        ↓
Frontend sends: POST /orders with JSON data
        ↓
Backend receives request
        ↓
Backend queries: Product (Laptop) → current quantity = 50
        ↓
Backend checks: Can we sell 2? Yes (50 ≥ 2)
        ↓
Backend creates: Order record, OrderItem record
        ↓
Backend updates: Product quantity 50 → 48
        ↓
Backend calculates: Order total = 999.99 × 2 = 1999.98
        ↓
Backend responds: 201 Created with order ID
        ↓
Frontend updates UI: "Order created successfully!"
        ↓
User can verify in Orders page: John's order for 2 Laptops = $1999.98
```

---

## 🔐 Security & Data

- **Database**: All data encrypted in transit (HTTPS + SSL)
- **Authentication**: Not implemented (free/demo tier)
- **CORS**: Only frontend domain allowed to call backend
- **Validation**: All inputs validated server-side using Pydantic

---

## 📈 Performance

- **Cold starts**: Render free tier sleeps → first request = 30 sec
- **Bandwidth**: Vercel free = 100GB/month (unlimited for reasonable use)
- **Database**: 1GB storage on Render free tier
- **Scalability**: Can upgrade to paid tiers for production traffic

---

## 🔑 Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | UI component library |
| Frontend | JavaScript (ES6) | Logic & state |
| Backend | FastAPI | Fast Python web framework |
| Backend | SQLAlchemy | ORM for database |
| Backend | Pydantic | Data validation |
| Database | PostgreSQL | Relational database |
| Container | Docker | Package app for cloud |
| Deployment | Vercel | Frontend hosting |
| Deployment | Render | Backend hosting |
| Deployment | Docker Hub | Image registry |
| Version Control | Git/GitHub | Code management |

---

## 📝 How to Explain This to Someone

### 30-Second Version
> "This is an inventory management system where users can track products, customers, and orders. The frontend is a React app hosted on Vercel, the backend is a Python API on Render, and data is stored in PostgreSQL. When you create an order, the system automatically deducts inventory and calculates totals."

### 2-Minute Version
> "The system has three main pages: Dashboard (shows stats), Products (CRUD operations), Customers (CRUD operations), and Orders (create orders which auto-deduct inventory). The frontend sends REST API calls to the backend, which queries the PostgreSQL database and returns JSON responses. Both frontend and backend auto-deploy when code is pushed to GitHub. Everything is containerized with Docker and runs on the cloud."

### 5-Minute Version
> Use the architecture diagram above + explain each component + show live URLs + demo creating a product/customer/order

---

## 🚀 Quick Start (Local Development)

### Windows (PowerShell)
```powershell
cd "e:\Ethara Product System"
./quickstart.bat
```

### Mac/Linux
```bash
cd "e:\Ethara Product System"
./quickstart.sh
```

**This starts:**
- Backend on http://localhost:8000
- Frontend on http://localhost:3000
- Database via docker-compose

Visit http://localhost:3000 to test locally before deploying.

---

## 📱 Live System URLs

- **Frontend App**: https://inventory-management-ijyz.vercel.app
- **Backend API**: https://inventory-backend-latest-8syt.onrender.com
- **API Docs (Swagger)**: https://inventory-backend-latest-8syt.onrender.com/docs
- **GitHub Repo**: https://github.com/VaNsH1108/inventory-management
- **Docker Hub Image**: https://hub.docker.com/r/vansh1108/inventory-backend

---

**Status**: ✅ Fully deployed and live | Data persists | Auto-scaling enabled | Production-ready

Last updated: June 1, 2026
