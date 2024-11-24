import React from 'react';
import Invoice from './Invoice';

const InvoiceList = ({ invoices, printInvoice }) => {
  // Handle edge case for invalid invoices array
  if (!Array.isArray(invoices)) {
    return <div>Error: Invoices data is invalid.</div>;
  }

  return (
    <div className="invoices-list">
      <h2>Invoices</h2>
      {invoices.length > 0 ? (
        invoices.map((invoice) => (
          <Invoice key={invoice.id} invoice={invoice} printInvoice={printInvoice} />
        ))
      ) : (
        <p>No invoices found.</p>
      )}
    </div>
  );
};

export default InvoiceList;
