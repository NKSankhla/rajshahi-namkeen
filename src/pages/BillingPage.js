import React, { useState, useEffect } from 'react';
import { useInvoiceContext } from '../context/InvoiceContext';
import BillingForm from '../components/BillingForm';
import '../App.css';

const BillingPage = () => {
  const { menu, cart, addToCart, updateQty, removeFromCart, generateInvoice } = useInvoiceContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for menu data
    setTimeout(() => {
      setLoading(false); // Set loading to false after fetching the menu data
    }, 1000); // Adjust the time as per your actual fetching time
  }, []);

  return (
    <div className="billing-page">
      {loading ? (
        <div className="loading">Loading menu...</div>
      ) : (
        <BillingForm
          menu={menu}
          cart={cart}
          addToCart={addToCart}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
          generateInvoice={generateInvoice}
        />
      )}

      {cart.length === 0 && !loading && <p className="empty-cart-message">Your cart is empty. Please add items to proceed.</p>}
    </div>
  );
};

export default BillingPage;
