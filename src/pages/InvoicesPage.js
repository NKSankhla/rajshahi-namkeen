import React from 'react';
import { useInvoiceContext } from '../context/InvoiceContext';
import InvoiceList from '../components/InvoiceList';

const InvoicesPage = () => {
  const { invoices } = useInvoiceContext();

  return (
    <div className="invoices-page">
      {invoices.length === 0 ? (
        <p>No invoices available.</p>
      ) : (
        <InvoiceList invoices={invoices} />
      )}
    </div>
  );
};

export default InvoicesPage;
