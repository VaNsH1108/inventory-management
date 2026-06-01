import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              📦 Inventory Manager
            </Link>
            <button className="hamburger" onClick={toggleMenu}>
              ☰
            </button>
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/customers" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Orders
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </main>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
