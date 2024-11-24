import React from 'react';

const Invoice = ({ invoice, printInvoice }) => {
  // Date formatting example (you can use libraries like date-fns or moment.js for more advanced formatting)
  const formattedDate = new Date(invoice.date).toLocaleDateString();

  if (!invoice || !invoice.items) {
    return <div>Invoice data is missing or invalid.</div>;
  }

  return (
    <div className="invoice-item">
      <h3>Invoice #{invoice.id}</h3>
      <p>Date: {formattedDate}</p>
      <ul>
        {invoice.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
          </li>
        ))}
      </ul>
      <h4>Total: ₹{invoice.total}</h4>
      <button onClick={() => printInvoice(invoice.id)} type="button">
        Print
      </button>
    </div>
  );
};

export default Invoice;
