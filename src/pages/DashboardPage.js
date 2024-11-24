import React from 'react';
import { useInvoiceContext } from '../context/InvoiceContext';
import '../App.css';

const DashboardPage = () => {
  const { invoices } = useInvoiceContext();

  const totalSales = invoices.reduce((total, invoice) => total + invoice.total, 0);
  const totalInvoices = invoices.length;

  // Function to format the total sales value as currency
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>{totalSales > 0 ? formatCurrency(totalSales) : '₹0.00'}</p>
        </div>
        <div className="stat-card">
          <h3>Total Invoices</h3>
          <p>{totalInvoices > 0 ? totalInvoices : 'No invoices yet'}</p>
        </div>
      </div>
      {/* Optionally, add a call-to-action or button */}
      {totalInvoices === 0 && (
        <div className="call-to-action">
          <p>Create your first invoice to get started!</p>
          <button className="generate-invoice-btn">Create Invoice</button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
