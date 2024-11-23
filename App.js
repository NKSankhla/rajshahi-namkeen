// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BillingPage from './pages/BillingPage';
import InvoicesPage from './pages/InvoicesPage';
import DashboardPage from './pages/DashboardPage';
import { InvoiceProvider } from './context/InvoiceContext';
import './App.css';

function App() {
  return (
    <InvoiceProvider>
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
          </Routes>
        </div>
      </Router>
    </InvoiceProvider>
  );
}

export default App;
