# Deployment Guide

This guide provides step-by-step instructions for deploying the Inventory & Order Management System to production.

## Table of Contents
1. [Backend Deployment](#backend-deployment)
2. [Frontend Deployment](#frontend-deployment)
3. [Database Setup](#database-setup)
4. [Docker Hub Setup](#docker-hub-setup)

---

## Backend Deployment

### Option 1: Deploy to Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up and log in

2. **Connect GitHub**
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select the repository

3. **Configure Service**
   ```
   Service Name: inventory-backend
   Environment: Python
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port 8000
   ```

4. **Set Environment Variables**
   - Go to "Environment" tab
   - Add the following variables:
     ```
     DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/inventory_db
     FRONTEND_URL=https://your-frontend-domain.com
     DEBUG=False
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the service URL

### Option 2: Deploy to Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "Start New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository

3. **Add Environment Variables**
   - In the Railway dashboard
   - Add `DATABASE_URL` with PostgreSQL connection string
   - Add `FRONTEND_URL` with your frontend domain
   - Add `DEBUG=False`

4. **Deploy**
   - Railway will automatically deploy when you push to main branch

### Option 3: Deploy to Fly.io

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Log In**
   ```bash
   flyctl auth login
   ```

3. **Create App**
   ```bash
   cd backend
   flyctl launch
   ```

4. **Set Environment Variables**
   ```bash
   flyctl secrets set DATABASE_URL="postgresql://<user>:<password>@<host>/<db>"
   flyctl secrets set FRONTEND_URL="https://your-frontend-domain.com"
   flyctl secrets set DEBUG="False"
   ```

5. **Deploy**
   ```bash
   flyctl deploy
   ```

---

## Frontend Deployment

### Option 1: Deploy to Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Select the project root

3. **Configure Build**
   ```
   Framework: Create React App
   Build Command: npm run build
   Output Directory: build
   ```

4. **Set Environment Variables**
   - Add `REACT_APP_API_URL` = your backend URL from deployment
   - Example: `https://inventory-backend.onrender.com`

5. **Deploy**
   - Click "Deploy"
   - Your frontend is now live!

### Option 2: Deploy to Netlify

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Deploy Site**
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository

3. **Configure Build**
   ```
   Build command: npm run build
   Publish directory: build
   ```

4. **Set Environment Variables**
   - Go to "Site settings" → "Build & Deploy" → "Environment"
   - Add `REACT_APP_API_URL` with your backend URL

5. **Deploy**
   - Click "Deploy site"
   - Your frontend is now live!

---

## Database Setup

### PostgreSQL on Render

1. **Create PostgreSQL Database**
   - In Render dashboard, click "New +" → "PostgreSQL"
   - Set up database configuration
   - Copy connection string
   - Use as `DATABASE_URL` in backend

### Alternative: Use Managed PostgreSQL Services

- **AWS RDS**: https://aws.amazon.com/rds/
- **Digital Ocean Managed Databases**: https://www.digitalocean.com/products/managed-databases/
- **Azure Database for PostgreSQL**: https://azure.microsoft.com/services/postgresql/

---

## Docker Hub Setup

### Create Docker Hub Account

1. **Sign Up**
   - Go to https://hub.docker.com
   - Create a free account

2. **Create Repositories**
   - Create repository: `inventory-backend`
   - Create repository: `inventory-frontend`

### Build and Push Images

```bash
# Login to Docker Hub
docker login

# Build backend image
docker build -t yourusername/inventory-backend:1.0.0 ./backend

# Build frontend image
docker build -t yourusername/inventory-frontend:1.0.0 ./frontend

# Push images
docker push yourusername/inventory-backend:1.0.0
docker push yourusername/inventory-frontend:1.0.0

# Tag as latest
docker tag yourusername/inventory-backend:1.0.0 yourusername/inventory-backend:latest
docker tag yourusername/inventory-frontend:1.0.0 yourusername/inventory-frontend:latest

# Push latest tags
docker push yourusername/inventory-backend:latest
docker push yourusername/inventory-frontend:latest
```

---

## Post-Deployment Verification

### 1. Test Backend API

```bash
# Check health
curl https://your-backend-url/health

# Get products
curl https://your-backend-url/products

# View API documentation
Open: https://your-backend-url/docs
```

### 2. Test Frontend

- Open https://your-frontend-url
- Test creating a product
- Test creating a customer
- Test creating an order
- Verify dashboard displays data

### 3. Test Database Connection

- Check that data persists
- Verify that inventory deduction works
- Confirm that email and SKU uniqueness is enforced

---

## Troubleshooting

### Backend Issues

**Database Connection Failed**
- Verify DATABASE_URL format
- Check if database is accessible from backend service
- Ensure credentials are correct

**CORS Errors**
- Update FRONTEND_URL environment variable
- Add frontend URL to CORS origins in backend code if needed

**502 Bad Gateway**
- Check backend logs
- Verify start command is correct
- Check if port 8000 is available

### Frontend Issues

**API Connection Failed**
- Verify REACT_APP_API_URL is set correctly
- Check browser console for errors
- Ensure backend service is running

**Blank Page**
- Check browser console for JavaScript errors
- Verify build directory is correct
- Clear cache and refresh

---

## Monitoring and Maintenance

### Set Up Monitoring

- **Render**: Built-in monitoring dashboard
- **Railway**: Real-time logs and metrics
- **Fly.io**: Metrics and alerts

### Backup Strategy

1. **Database Backups**
   - Enable automated backups in PostgreSQL service
   - Download backup: `pg_dump > backup.sql`

2. **Code Backups**
   - Use GitHub for version control
   - Create tags for releases

### Scaling

- **Backend**: Increase server size if needed
- **Database**: Upgrade plan for increased connections
- **Frontend**: Already CDN-distributed by Vercel/Netlify

---

## Performance Optimization

### Backend Optimization
- Enable gzip compression
- Add caching headers
- Optimize database queries
- Use connection pooling

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization
- CSS minification
- Build size analysis

---

## Security Checklist

- [ ] No hardcoded credentials in code
- [ ] Environment variables properly configured
- [ ] HTTPS enabled on all URLs
- [ ] CORS properly configured
- [ ] Database password is strong
- [ ] API rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Regular dependency updates

---

## Support URLs

- **Backend**: https://your-backend-url
- **Frontend**: https://your-frontend-url
- **API Docs**: https://your-backend-url/docs
- **Docker Hub**: https://hub.docker.com/u/yourusername

---

**Last Updated**: June 2026
