import React, { useState } from 'react';
import { FaCartPlus, FaMinus, FaPlus, FaTrashAlt, FaFileInvoice } from 'react-icons/fa';

const BillingForm = ({ menu, cart, addToCart, updateQty, removeFromCart, generateInvoice }) => {
  const [weightInput, setWeightInput] = useState({});
  
  // Create a cart item map for faster lookups
  const cartItemsMap = cart.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const handleWeightChange = (item, weight) => {
    if (weight <= 0 || isNaN(weight)) return;
    addToCart(item, weight);
    setWeightInput({ ...weightInput, [item.id]: '' });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      updateQty(id, newQty);
    }
  };

  return (
    <div className="billing-form">
      {/* Menu Section */}
      <div className="menu">
        <h2>Menu</h2>
        <ul>
          {menu.map(item => (
            <li key={item.id} className="menu-item">
              <span>{item.name} - ₹{item.price} {item.unitType === 'weight' ? '/kg' : ''}</span>
              {/* If item is of quantity type */}
              {item.unitType === 'qty' ? (
                cartItemsMap[item.id] ? (
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, cartItemsMap[item.id].qty - 1)}
                      disabled={cartItemsMap[item.id].qty <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{cartItemsMap[item.id].qty}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, cartItemsMap[item.id].qty + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(item, 1)}>
                    <FaCartPlus /> Add to Cart
                  </button>
                )
              ) : (
                // For weight-based items
                <div className="weight-input">
                  <input
                    type="number"
                    value={weightInput[item.id] || ''}
                    onChange={(e) => setWeightInput({ ...weightInput, [item.id]: e.target.value })}
                    placeholder="Enter weight in kg"
                    min="0.1"
                    step="0.1"
                  />
                  <button
                    onClick={() => handleWeightChange(item, parseFloat(weightInput[item.id] || 0))}
                    disabled={!weightInput[item.id] || parseFloat(weightInput[item.id]) <= 0}
                  >
                    <FaCartPlus /> Add to Cart
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Cart Section */}
      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} x {item.qty} {item.unitType === 'weight' ? 'kg' : ''} - ₹{item.qty * item.price}
              <button onClick={() => removeFromCart(item.id)}>
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <h3>Total: ₹{cart.reduce((total, item) => total + item.qty * item.price, 0)}</h3>
        </div>
        <button onClick={generateInvoice} className="generate-invoice-btn">
          <FaFileInvoice /> Generate Invoice
        </button>
      </div>
    </div>
  );
};

export default BillingForm;
