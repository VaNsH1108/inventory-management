import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: (skip = 0, limit = 100) =>
    api.get(`/products?skip=${skip}&limit=${limit}`),
  get: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Customers API
export const customersAPI = {
  getAll: (skip = 0, limit = 100) =>
    api.get(`/customers?skip=${skip}&limit=${limit}`),
  get: (id) => api.get(`/customers/${id}`),
  create: (data) => api.post('/customers', data),
  delete: (id) => api.delete(`/customers/${id}`),
};

// Orders API
export const ordersAPI = {
  getAll: (skip = 0, limit = 100) =>
    api.get(`/orders?skip=${skip}&limit=${limit}`),
  get: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  delete: (id) => api.delete(`/orders/${id}`),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard'),
};

// Health Check
export const healthCheck = () => api.get('/health');

export default api;
