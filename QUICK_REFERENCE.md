# 🚀 Quick Reference Guide

## Start Application Immediately

### Windows
```bash
quickstart.bat
```

### Mac/Linux
```bash
./quickstart.sh
chmod +x quickstart.sh
```

### Manual Docker Start
```bash
docker-compose up --build
```

---

## Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3000 | Web Application |
| **Backend** | http://localhost:8000 | API Server |
| **API Docs** | http://localhost:8000/docs | Interactive Documentation |
| **Health Check** | http://localhost:8000/health | Server Status |
| **Database** | localhost:5432 | PostgreSQL |

---

## Stop Application

```bash
docker-compose down
```

---

## View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

---

## Database Access

```bash
docker exec -it inventory_db psql -U user -d inventory_db

# Then run SQL:
SELECT * FROM products;
SELECT * FROM customers;
SELECT * FROM orders;
```

---

## Reset Everything

```bash
docker-compose down -v
docker-compose up --build
```

---

## Default Credentials

| Item | Value |
|------|-------|
| **DB User** | user |
| **DB Password** | password |
| **DB Name** | inventory_db |
| **DB Host** | db |
| **DB Port** | 5432 |

---

## API Quick Tests

### Create Product
```bash
curl -X POST http://localhost:8000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "sku": "LAP001",
    "price": 999.99,
    "quantity": 50
  }'
```

### Get All Products
```bash
curl http://localhost:8000/products
```

### Get Dashboard Stats
```bash
curl http://localhost:8000/dashboard
```

---

## Common Commands

| Task | Command |
|------|---------|
| **Build** | `docker-compose build` |
| **Start** | `docker-compose up -d` |
| **Stop** | `docker-compose down` |
| **Restart** | `docker-compose restart` |
| **Logs** | `docker-compose logs -f` |
| **Remove Data** | `docker-compose down -v` |
| **Status** | `docker-compose ps` |

---

## Documentation Files

| File | Read First |
|------|-----------|
| `BUILD_SUMMARY.md` | ⭐ Start here |
| `SETUP.md` | Development setup |
| `DEPLOYMENT.md` | Production deployment |
| `API_REFERENCE.md` | API details |
| `README.md` | Full overview |

---

## Project Structure

```
backend/     → FastAPI application
frontend/    → React application
              docker-compose.yml  → Local development setup
              docker-compose.prod.yml → Production setup
```

---

## Feature Checklist

✅ Products (Create, Read, Update, Delete)
✅ Customers (Create, Read, Delete)
✅ Orders (Create, Read, Delete)
✅ Dashboard (Statistics & Alerts)
✅ Inventory Management
✅ API Documentation
✅ Docker Support
✅ Responsive UI

---

## Next Steps

1. **Run locally**: `docker-compose up --build`
2. **Test features**: Open http://localhost:3000
3. **Deploy**: Follow DEPLOYMENT.md
4. **Submit**: Use SUBMISSION_CHECKLIST.md

---

## Troubleshooting

### Can't access frontend?
- Wait 15 seconds for container to start
- Check `docker-compose logs frontend`

### Can't access backend?
- Wait 15 seconds for container to start
- Check `docker-compose logs backend`

### Database connection error?
- Run `docker-compose down -v`
- Run `docker-compose up --build`

### Port already in use?
- Edit `docker-compose.yml` and change ports
- Or kill process using the port

---

## Useful Resources

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [Docker Docs](https://docs.docker.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## Support

All documentation is in the project root:
- Questions about setup? → **SETUP.md**
- Questions about deployment? → **DEPLOYMENT.md**
- Questions about APIs? → **API_REFERENCE.md**
- Need checklist? → **SUBMISSION_CHECKLIST.md**

---

**Status**: ✅ Ready to Run  
**Version**: 1.0.0  
**Last Updated**: June 2026
