# API Reference Guide

This document provides detailed information about all API endpoints in the Inventory & Order Management System.

## Base URL

```
http://localhost:8000
```

## Response Format

All responses are in JSON format with consistent structure.

### Success Response (2xx)
```json
{
  "id": 1,
  "name": "Product Name",
  "... other fields ...": "values"
}
```

### Error Response (4xx, 5xx)
```json
{
  "detail": "Error message describing what went wrong"
}
```

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid input or business rule violation
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Endpoints

### Health & Status

#### GET /
Get API information

**Response (200)**
```json
{
  "message": "Welcome to Inventory & Order Management System API",
  "version": "1.0.0",
  "docs": "/docs"
}
```

#### GET /health
Health check endpoint

**Response (200)**
```json
{
  "status": "healthy",
  "message": "Server is running"
}
```

---

## Products

### POST /products
Create a new product

**Request Body**
```json
{
  "name": "Laptop",
  "sku": "LAP001",
  "price": 999.99,
  "quantity": 50
}
```

**Response (201)**
```json
{
  "id": 1,
  "name": "Laptop",
  "sku": "LAP001",
  "price": 999.99,
  "quantity": 50,
  "created_at": "2026-06-01T10:00:00",
  "updated_at": "2026-06-01T10:00:00"
}
```

**Error Examples**
```json
{
  "detail": "Product with SKU 'LAP001' already exists"
}
```

**Validations**
- `name` - Required, string
- `sku` - Required, unique string
- `price` - Required, must be > 0
- `quantity` - Required, must be >= 0

---

### GET /products
Get all products

**Query Parameters**
- `skip` (optional, default: 0) - Number of records to skip for pagination
- `limit` (optional, default: 100) - Maximum number of records to return

**Example Requests**
```
GET /products
GET /products?skip=0&limit=10
GET /products?skip=20&limit=50
```

**Response (200)**
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "sku": "LAP001",
    "price": 999.99,
    "quantity": 50,
    "created_at": "2026-06-01T10:00:00",
    "updated_at": "2026-06-01T10:00:00"
  },
  {
    "id": 2,
    "name": "Mouse",
    "sku": "MOUSE001",
    "price": 29.99,
    "quantity": 100,
    "created_at": "2026-06-01T10:05:00",
    "updated_at": "2026-06-01T10:05:00"
  }
]
```

---

### GET /products/{id}
Get a specific product by ID

**Path Parameters**
- `id` - Product ID (integer, required)

**Response (200)**
```json
{
  "id": 1,
  "name": "Laptop",
  "sku": "LAP001",
  "price": 999.99,
  "quantity": 50,
  "created_at": "2026-06-01T10:00:00",
  "updated_at": "2026-06-01T10:00:00"
}
```

**Error Example (404)**
```json
{
  "detail": "Product with ID 999 not found"
}
```

---

### PUT /products/{id}
Update a product

**Path Parameters**
- `id` - Product ID (integer, required)

**Request Body** (all fields optional, only provide fields to update)
```json
{
  "name": "Gaming Laptop",
  "price": 1299.99,
  "quantity": 40
}
```

**Response (200)**
```json
{
  "id": 1,
  "name": "Gaming Laptop",
  "sku": "LAP001",
  "price": 1299.99,
  "quantity": 40,
  "created_at": "2026-06-01T10:00:00",
  "updated_at": "2026-06-01T11:30:00"
}
```

**Note**: SKU cannot be updated after creation

---

### DELETE /products/{id}
Delete a product

**Path Parameters**
- `id` - Product ID (integer, required)

**Response (204)** - No content

**Error Example (404)**
```json
{
  "detail": "Product with ID 999 not found"
}
```

---

## Customers

### POST /customers
Create a new customer

**Request Body**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234"
}
```

**Response (201)**
```json
{
  "id": 1,
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "created_at": "2026-06-01T10:00:00",
  "updated_at": "2026-06-01T10:00:00"
}
```

**Error Examples**
```json
{
  "detail": "Customer with email 'john@example.com' already exists"
}
```

**Validations**
- `full_name` - Required, string
- `email` - Required, valid email, unique
- `phone` - Required, string

---

### GET /customers
Get all customers

**Query Parameters**
- `skip` (optional, default: 0)
- `limit` (optional, default: 100)

**Response (200)**
```json
[
  {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "created_at": "2026-06-01T10:00:00",
    "updated_at": "2026-06-01T10:00:00"
  }
]
```

---

### GET /customers/{id}
Get a specific customer

**Response (200)**
```json
{
  "id": 1,
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "created_at": "2026-06-01T10:00:00",
  "updated_at": "2026-06-01T10:00:00"
}
```

---

### DELETE /customers/{id}
Delete a customer

**Response (204)** - No content

---

## Orders

### POST /orders
Create a new order

**Request Body**
```json
{
  "customer_id": 1,
  "order_items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 2,
      "quantity": 3
    }
  ]
}
```

**Response (201)**
```json
{
  "id": 1,
  "customer_id": 1,
  "total_amount": 2149.97,
  "created_at": "2026-06-01T10:00:00",
  "updated_at": "2026-06-01T10:00:00",
  "order_items": [
    {
      "id": 1,
      "order_id": 1,
      "product_id": 1,
      "quantity": 2,
      "unit_price": 999.99
    },
    {
      "id": 2,
      "order_id": 1,
      "product_id": 2,
      "quantity": 3,
      "unit_price": 29.99
    }
  ]
}
```

**Error Examples**
```json
{
  "detail": "Customer with ID 999 not found"
}
```

```json
{
  "detail": "Insufficient inventory for product 'Laptop'. Available: 2, Requested: 5"
}
```

**Validations**
- `customer_id` - Required, customer must exist
- `order_items` - Required, non-empty array
- `product_id` - Required, product must exist
- `quantity` - Required, must be > 0, must not exceed available stock

**Business Logic**
- Total amount is calculated automatically
- Inventory is reduced when order is created
- All items must have sufficient stock before order creation

---

### GET /orders
Get all orders

**Query Parameters**
- `skip` (optional, default: 0)
- `limit` (optional, default: 100)

**Response (200)**
```json
[
  {
    "id": 1,
    "customer_id": 1,
    "total_amount": 2149.97,
    "created_at": "2026-06-01T10:00:00",
    "updated_at": "2026-06-01T10:00:00",
    "order_items": [
      {
        "id": 1,
        "order_id": 1,
        "product_id": 1,
        "quantity": 2,
        "unit_price": 999.99
      }
    ]
  }
]
```

---

### GET /orders/{id}
Get a specific order

**Response (200)**
```json
{
  "id": 1,
  "customer_id": 1,
  "total_amount": 2149.97,
  "created_at": "2026-06-01T10:00:00",
  "updated_at": "2026-06-01T10:00:00",
  "order_items": [
    {
      "id": 1,
      "order_id": 1,
      "product_id": 1,
      "quantity": 2,
      "unit_price": 999.99
    }
  ]
}
```

---

### DELETE /orders/{id}
Cancel/Delete an order

**Behavior**: Canceling an order restores the inventory for all items in the order

**Response (204)** - No content

---

## Dashboard

### GET /dashboard
Get dashboard statistics

**Response (200)**
```json
{
  "total_products": 5,
  "total_customers": 3,
  "total_orders": 2,
  "total_revenue": 5000.00,
  "low_stock_products": [
    {
      "id": 1,
      "name": "Laptop",
      "sku": "LAP001",
      "price": 999.99,
      "quantity": 5,
      "created_at": "2026-06-01T10:00:00",
      "updated_at": "2026-06-01T10:00:00"
    }
  ]
}
```

**Note**: Low stock is defined as quantity < 10

---

## Interactive Documentation

The API includes interactive documentation powered by Swagger UI. Access it at:

```
http://localhost:8000/docs
```

You can:
- View all endpoints
- Test endpoints directly
- See request/response examples
- Check required and optional parameters

---

## Error Handling

### Common Error Responses

**Bad Request (400)**
```json
{
  "detail": "Ensure all required fields are provided and valid"
}
```

**Not Found (404)**
```json
{
  "detail": "Product with ID 999 not found"
}
```

**Internal Server Error (500)**
```json
{
  "detail": "An internal server error occurred"
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider implementing:
- Request throttling
- IP-based rate limiting
- User-based rate limiting

---

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:8000`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:8000`
- `http://frontend:3000`
- Frontend URL from environment variable

---

## Best Practices

1. **Always validate input data** - Use the frontend validation and trust server-side validation
2. **Use pagination** - For large datasets, use `skip` and `limit` parameters
3. **Check response status** - Always handle both success and error responses
4. **Follow HTTP methods** - GET for retrieval, POST for creation, PUT for updates, DELETE for deletion
5. **Use appropriate headers** - Include `Content-Type: application/json`

---

## Testing Examples

### Using Python requests
```python
import requests

# Create a product
response = requests.post(
    'http://localhost:8000/products',
    json={
        'name': 'Laptop',
        'sku': 'LAP001',
        'price': 999.99,
        'quantity': 50
    }
)
print(response.json())
```

### Using JavaScript fetch
```javascript
fetch('http://localhost:8000/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Laptop',
    sku: 'LAP001',
    price: 999.99,
    quantity: 50
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

---

**Last Updated**: June 2026
