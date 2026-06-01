import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../api';
import { toast } from 'react-toastify';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container">
        <h1 className="page-title">Dashboard</h1>
        <div className="alert alert-danger">Failed to load dashboard statistics</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">📊 Dashboard</h1>

      <div className="grid">
        <div className="card">
          <div className="card-title">📦 Total Products</div>
          <div className="card-value">{stats.total_products}</div>
        </div>

        <div className="card">
          <div className="card-title">👥 Total Customers</div>
          <div className="card-value">{stats.total_customers}</div>
        </div>

        <div className="card">
          <div className="card-title">📋 Total Orders</div>
          <div className="card-value">{stats.total_orders}</div>
        </div>

        <div className="card">
          <div className="card-title">💰 Total Revenue</div>
          <div className="card-value">${stats.total_revenue.toFixed(2)}</div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        <h2 className="section-title">⚠️ Low Stock Products</h2>
        {stats.low_stock_products.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Current Stock</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {stats.low_stock_products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>
                    <span className="badge badge-warning">
                      {product.quantity} units
                    </span>
                  </td>
                  <td>${product.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">✓</div>
            <p className="empty-state-text">All products have sufficient stock!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
