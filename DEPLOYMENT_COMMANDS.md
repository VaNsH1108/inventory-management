# 🔧 Step-by-Step Deployment Commands

Follow these commands in order to deploy your application.

## 📋 Prerequisites

Before starting, make sure you have:

- [ ] Docker Desktop installed and running
- [ ] Git installed
- [ ] GitHub account (free)
- [ ] Docker Hub account (free)
- [ ] Render account (free)
- [ ] Vercel account (free)

---

## PART 1: GitHub Setup

### Step 1.1: Initialize Git Repository

```powershell
cd "E:\Ethara Product System"
git init
git config user.name "Your Full Name"
git config user.email "your.email@gmail.com"
git add .
git commit -m "Initial commit: Full-stack Inventory Management System v1.0.0"
```

**What this does**: Creates a local git repository with all your code.

---

### Step 1.2: Create GitHub Repository

**Manual Steps**:
1. Go to https://github.com/new
2. **Repository name**: `inventory-management`
3. **Description**: "Production-ready Inventory & Order Management System"
4. Choose **Public**
5. Click **Create repository**

---

### Step 1.3: Push to GitHub

```powershell
git remote add origin https://github.com/YOUR_USERNAME/inventory-management.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**Result**: Your code is now on GitHub!

**GitHub Repository URL**: `https://github.com/YOUR_USERNAME/inventory-management`

---

## PART 2: Docker Hub Setup

### Step 2.1: Login to Docker

```powershell
docker login
```

When prompted, enter your Docker Hub username and password.

---

### Step 2.2: Build Backend Image

```powershell
cd "E:\Ethara Product System"
docker build -t YOUR_DOCKERHUB_USERNAME/inventory-backend:1.0.0 ./backend
docker tag YOUR_DOCKERHUB_USERNAME/inventory-backend:1.0.0 YOUR_DOCKERHUB_USERNAME/inventory-backend:latest
```

Replace `YOUR_DOCKERHUB_USERNAME` with your actual Docker Hub username.

**What this does**:
- Takes the Dockerfile in `backend/` folder
- Installs all Python dependencies
- Creates a ~400MB image ready to run

---

### Step 2.3: Build Frontend Image

```powershell
docker build -t YOUR_DOCKERHUB_USERNAME/inventory-frontend:1.0.0 ./frontend
docker tag YOUR_DOCKERHUB_USERNAME/inventory-frontend:1.0.0 YOUR_DOCKERHUB_USERNAME/inventory-frontend:latest
```

**What this does**:
- Takes the Dockerfile in `frontend/` folder
- Builds React app
- Creates a ~150MB image

---

### Step 2.4: Push Backend Image to Docker Hub

```powershell
docker push YOUR_DOCKERHUB_USERNAME/inventory-backend:1.0.0
docker push YOUR_DOCKERHUB_USERNAME/inventory-backend:latest
```

**What this does**:
- Uploads images to Docker Hub (takes 2-3 minutes)
- Makes images available for cloud services to pull

---

### Step 2.5: Push Frontend Image to Docker Hub

```powershell
docker push YOUR_DOCKERHUB_USERNAME/inventory-frontend:1.0.0
docker push YOUR_DOCKERHUB_USERNAME/inventory-frontend:latest
```

**Result**: Both images are now on Docker Hub!

**Docker Hub URLs**:
- Backend: `https://hub.docker.com/r/YOUR_USERNAME/inventory-backend`
- Frontend: `https://hub.docker.com/r/YOUR_USERNAME/inventory-frontend`

---

## PART 3: Backend Deployment on Render

### Step 3.1: Create Database

**Manual Steps**:

1. Go to https://render.com
2. Click **Sign Up** → Choose **GitHub** signup
3. Authorize GitHub
4. In dashboard, click **New +** → **PostgreSQL**
5. Fill in:
   - **Name**: `inventory-db`
   - **Database**: `inventory_db`
   - **User**: `dbuser`
   - **Region**: Choose your region
   - **Plan**: Free
6. Click **Create Database**
7. **IMPORTANT**: Copy the connection string from the page - save it!

**Connection String Format**:
```
postgresql://dbuser:PASSWORD@hostname.postgres.render.com:5432/inventory_db
```

Keep this safe - you'll need it in the next step!

---

### Step 3.2: Deploy Backend Service

**Manual Steps**:

1. In Render dashboard, click **New +** → **Web Service**
2. Click **Deploy an existing image**
3. In **Image URL**, paste:
   ```
   YOUR_DOCKERHUB_USERNAME/inventory-backend:latest
   ```
4. Fill in:
   - **Name**: `inventory-backend`
   - **Region**: Same as database
   - **Plan**: Free

5. Click **Advanced** (important!)
6. Under **Environment**, add these variables:

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | `postgresql://dbuser:PASSWORD@hostname.postgres.render.com:5432/inventory_db` |
   | `FRONTEND_URL` | `https://inventory-frontend-YOUR_USERNAME.vercel.app` (leave blank for now) |
   | `DEBUG` | `False` |

   Replace PASSWORD and hostname from Step 3.1

7. Click **Create Web Service**

**Wait 3-5 minutes for deployment**

---

### Step 3.3: Get Backend URL

Once deployed:

1. Go to your Render dashboard
2. Click on the `inventory-backend` service
3. At the top, you'll see a URL like:
   ```
   https://inventory-backend-xxxxx.onrender.com
   ```

**Copy this URL** - you'll need it for the frontend!

**Test Backend**:
```powershell
curl https://inventory-backend-xxxxx.onrender.com/health
```

Should return:
```json
{"status": "healthy", "message": "Server is running"}
```

---

## PART 4: Frontend Deployment on Vercel

### Step 4.1: Deploy to Vercel

**Manual Steps**:

1. Go to https://vercel.com
2. Click **Sign Up** → Choose **GitHub** signup
3. Authorize GitHub
4. Click **Add New** → **Project**
5. Search for and select your `inventory-management` repository
6. Fill in:
   - **Framework**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

7. Click **Advanced** → **Environment Variables**
8. Add:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://inventory-backend-xxxxx.onrender.com` (from Step 3.3)

9. Click **Deploy**

**Wait 3-5 minutes for deployment**

---

### Step 4.2: Get Frontend URL

Once deployed, Vercel shows your URL:
```
https://inventory-frontend-YOUR_USERNAME.vercel.app
```

**Test Frontend**:
1. Open the URL in your browser
2. You should see the dashboard
3. Try creating a product

---

## PART 5: Final Configuration

### Step 5.1: Update Backend CORS

Now that you have the frontend URL, update the backend:

**Edit** `backend/main.py` line ~34:

Add your frontend URL to the origins list:

```python
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "http://frontend:3000",
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
    "https://inventory-frontend-YOUR_USERNAME.vercel.app"  # ADD THIS
]
```

Replace with your actual Vercel URL from Step 4.2

---

### Step 5.2: Push Changes to GitHub

```powershell
cd "E:\Ethara Product System"
git add .
git commit -m "Update CORS configuration for production"
git push origin main
```

---

### Step 5.3: Redeploy Frontend

The frontend will **auto-redeploy** when you push to GitHub!

1. Go to Vercel dashboard
2. Check **Deployments** tab
3. Wait for the new deployment to finish (usually 1-2 minutes)

---

## ✅ Verification Checklist

### Test Backend APIs

```powershell
# Health Check
curl https://inventory-backend-xxxxx.onrender.com/health

# Get Products
curl https://inventory-backend-xxxxx.onrender.com/products

# View API Documentation
# Open: https://inventory-backend-xxxxx.onrender.com/docs
```

### Test Frontend

1. Open: `https://inventory-frontend-YOUR_USERNAME.vercel.app`
2. Click "Dashboard" - should load with 0 products
3. Click "Products" → "Add Product"
4. Fill in:
   - Name: `Test Laptop`
   - SKU: `TEST001`
   - Price: `999.99`
   - Quantity: `50`
5. Click "Create"
6. Should see success message
7. Product should appear in list

### Test End-to-End Flow

1. **Create Product**:
   - Go to Products
   - Create: Laptop (SKU: LAP001, Price: 999.99, Qty: 50)

2. **Create Customer**:
   - Go to Customers
   - Create: John Doe (email: john@example.com, phone: 555-1234)

3. **Create Order**:
   - Go to Orders
   - Click "Create Order"
   - Select customer: John Doe
   - Select product: Laptop
   - Quantity: 2
   - Click "Create Order"

4. **Verify Inventory Decreased**:
   - Go to Products
   - Laptop quantity should now be 48 (50 - 2)

5. **Verify Dashboard**:
   - Total Products: 1
   - Total Customers: 1
   - Total Orders: 1
   - Total Revenue: 1999.98

---

## 📊 Your Deployment URLs

```
GitHub Repository:
https://github.com/YOUR_USERNAME/inventory-management

Docker Hub Backend:
https://hub.docker.com/r/YOUR_DOCKERHUB_USERNAME/inventory-backend

Docker Hub Frontend:
https://hub.docker.com/r/YOUR_DOCKERHUB_USERNAME/inventory-frontend

Live Frontend:
https://inventory-frontend-YOUR_USERNAME.vercel.app

Live Backend API:
https://inventory-backend-xxxxx.onrender.com

API Documentation:
https://inventory-backend-xxxxx.onrender.com/docs

API Health Check:
https://inventory-backend-xxxxx.onrender.com/health
```

---

## 🐛 Troubleshooting

### Backend shows "502 Bad Gateway"

**Solution**:
1. Go to Render dashboard
2. Click your backend service
3. Click **Manual Deploy** button
4. Wait for it to redeploy (2-3 minutes)

### Frontend shows blank page

**Solution**:
1. Open browser DevTools (F12)
2. Check **Console** tab for errors
3. Verify REACT_APP_API_URL is correct
4. Verify backend is running

### Can't connect to database

**Solution**:
1. Check Render logs: dashboard → service → **Logs** tab
2. Verify DATABASE_URL is correct
3. Check PostgreSQL service is running

### CORS errors in browser console

**Solution**:
1. Verify frontend URL in backend CORS list
2. Must match exactly (including https://)
3. Redeploy backend after fixing

---

## 📈 Performance Tips

- **Cold starts**: Render free tier sleeps. First request takes 30 seconds.
- **Bandwidth**: Vercel free tier has 100GB/month
- **Database**: 1GB free storage on Render

---

## 💾 Backup Your Data

```powershell
# Backup database
# From Render dashboard:
# 1. Go to PostgreSQL service
# 2. Click "Backups" tab
# 3. Click "Download" on any backup
```

---

## 🔄 Auto-Deployment

Once set up, changes happen automatically:

1. You push code to GitHub
2. Vercel/Render detect changes
3. Services rebuild and redeploy
4. Changes live in 1-5 minutes

---

## ✨ What's Now Live

✅ **Frontend**: React app accessible globally
✅ **Backend**: FastAPI with all 13 endpoints
✅ **Database**: PostgreSQL data persistence
✅ **Auto-Deploy**: Changes pushed automatically
✅ **Documentation**: API docs at /docs endpoint
✅ **Monitoring**: Logs available on Render/Vercel

---

**Deployment Complete!** 🎉

You now have a production-ready application accessible worldwide!
