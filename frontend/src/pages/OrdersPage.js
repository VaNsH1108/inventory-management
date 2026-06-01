import React, { useEffect, useState } from 'react';
import { ordersAPI, productsAPI, customersAPI } from '../api';
import { toast } from 'react-toastify';
import './Pages.css';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: '',
    order_items: [{ product_id: '', quantity: '' }],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, productsRes, customersRes] = await Promise.all([
        ordersAPI.getAll(),
        productsAPI.getAll(),
        customersAPI.getAll(),
      ]);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
      setCustomers(customersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOrderItemChange = (index, field, value) => {
    const newItems = [...formData.order_items];
    newItems[index][field] = value;
    setFormData({
      ...formData,
      order_items: newItems,
    });
  };

  const addOrderItem = () => {
    setFormData({
      ...formData,
      order_items: [...formData.order_items, { product_id: '', quantity: '' }],
    });
  };

  const removeOrderItem = (index) => {
    const newItems = formData.order_items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      order_items: newItems,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        customer_id: parseInt(formData.customer_id),
        order_items: formData.order_items.map((item) => ({
          product_id: parseInt(item.product_id),
          quantity: parseInt(item.quantity),
        })),
      };

      await ordersAPI.create(data);
      toast.success('Order created successfully');
      setFormData({
        customer_id: '',
        order_items: [{ product_id: '', quantity: '' }],
      });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error('Failed to create order');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await ordersAPI.delete(id);
        toast.success('Order cancelled successfully');
        fetchData();
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error('Failed to cancel order');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      customer_id: '',
      order_items: [{ product_id: '', quantity: '' }],
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">📋 Orders</h1>

      <div style={{ marginBottom: '2rem' }}>
        <button
          className="button btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Create Order'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h2 className="section-title">Create New Order</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Customer *</label>
              <select
                name="customer_id"
                value={formData.customer_id}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select a Customer --</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.full_name} ({customer.email})
                  </option>
                ))}
              </select>
            </div>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
              Order Items
            </h3>

            {formData.order_items.map((item, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f7fafc', borderRadius: '4px' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Product *</label>
                    <select
                      value={item.product_id}
                      onChange={(e) => handleOrderItemChange(index, 'product_id', e.target.value)}
                      required
                    >
                      <option value="">-- Select a Product --</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} (Stock: {product.quantity})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Quantity *</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleOrderItemChange(index, 'quantity', e.target.value)}
                      required
                      min="1"
                      placeholder="Enter quantity"
                    />
                  </div>
                </div>

                {formData.order_items.length > 1 && (
                  <button
                    type="button"
                    className="button btn-danger"
                    onClick={() => removeOrderItem(index)}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                  >
                    Remove Item
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="button btn-secondary"
              onClick={addOrderItem}
              style={{ marginBottom: '1.5rem' }}
            >
              + Add Another Item
            </button>

            <div className="btn-group">
              <button type="submit" className="button btn-success">
                ✓ Create Order
              </button>
              <button
                type="button"
                className="button btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {orders.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Items</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const customer = customers.find((c) => c.id === order.customer_id);
              return (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{customer ? customer.full_name : 'Unknown'}</td>
                  <td>${order.total_amount.toFixed(2)}</td>
                  <td>{order.order_items.length} item(s)</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="button btn-danger"
                      onClick={() => handleDelete(order.id)}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p className="empty-state-text">No orders found</p>
          <p>Create your first order to get started</p>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
