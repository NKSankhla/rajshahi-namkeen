import React, { createContext, useContext, useState } from 'react';

const InvoiceContext = createContext();
export const useInvoiceContext = () => useContext(InvoiceContext);

export const InvoiceProvider = ({ children }) => {
  const [menu] = useState([
    { id: 1, name: 'Samosa', price: 20, unitType: 'qty' },
    { id: 2, name: 'Kachori', price: 20, unitType: 'qty' },
    { id: 3, name: 'Shahi Samosa', price: 25, unitType: 'qty' },
    { id: 4, name: 'Dahi Bada', price: 30, unitType: 'qty' },
    { id: 5, name: 'Jalebi', price: 400, unitType: 'weight' },
    { id: 6, name: 'Malpua', price: 550, unitType: 'weight' },
  ]);
  const [cart, setCart] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const addToCart = (item, qty) => {
    setCart(prevCart => {
      const exists = prevCart.find(cartItem => cartItem.id === item.id);
      if (exists) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + qty } : cartItem
        );
      } else {
        return [...prevCart, { ...item, qty }];
      }
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart => prevCart.map(item => (item.id === id ? { ...item, qty } : item)));
    }
  };

  const removeFromCart = (id) => setCart(prevCart => prevCart.filter(item => item.id !== id));

  const generateInvoice = () => {
    if (cart.length === 0) {
      alert('Cart is empty! Add items to generate an invoice.');
      return;
    }
    
    const newInvoice = {
      id: Date.now(),  // Unique ID using timestamp
      date: new Date().toLocaleDateString(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.qty * item.price, 0),
    };

    setInvoices([newInvoice, ...invoices]);
    printInvoice(newInvoice);
    setCart([]);
    alert('Invoice generated successfully!');
  };

  const printInvoice = (invoice) => {
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Invoice</title></head><body>');
    
    // Set up CSS styles to make everything monospace
    printWindow.document.write('<style>body { font-family: monospace; font-size: 16px; line-height: 1.5; margin: 0; padding: 0; }</style>');
    
    // Utility function to center text for a 32-character wide line (approximate for a 4-inch printer)
    const centerText = (text) => {
      const maxWidth = 32;  // 32 characters per line for a 4-inch roll
      const textLength = text.length;
      const padding = Math.floor((maxWidth - textLength) / 2); // Calculate left padding
      return ' '.repeat(padding) + text + ' '.repeat(maxWidth - textLength - padding);  // Right padding
    };
  
    // Center the title, invoice, and date
    printWindow.document.write('<h2 style="text-align:center; margin: 0;">' + centerText("Rajshahi Namkeen") + '</h2>');
    printWindow.document.write('<h3 style="text-align:center; margin: 0;">' + centerText("Invoice") + '</h3>');
    printWindow.document.write('<p style="text-align:center; margin: 0;">' + centerText(`Date: ${invoice.date}`) + '</p>');
    
    printWindow.document.write('<pre>');  // Monospace for the rest of the invoice content
    
    // Header
    printWindow.document.write('---------------------------------------------------------------\n');
    printWindow.document.write('Item                        Qty   Price    Total\n');
    printWindow.document.write('---------------------------------------------------------------\n');
    
    // Item Details with adjusted column width for 4-inch printer
    invoice.items.forEach(item => {
      const total = item.qty * item.price;
  
      // Ensure columns are properly aligned and within 80 characters width
      const formattedItem = `${item.name.padEnd(25)} ${item.qty.toString().padStart(3)} ${`₹${item.price.toFixed(2)}`.padStart(7)} ₹${total.toFixed(2).padStart(7)}`;
      printWindow.document.write(formattedItem + '\n');
    });
  
    // Total Amount Section
    printWindow.document.write('---------------------------------------------------------------\n');
    printWindow.document.write(`Total Amount:        ₹${invoice.total.toFixed(2).padStart(7)}\n`);
    printWindow.document.write('---------------------------------------------------------------\n');
  
    // Footer with a thank you message
    printWindow.document.write('\nThank you for visiting Rajshahi Namkeen!\n');
    printWindow.document.write('---------------------------------------------------------------\n');
    
    printWindow.document.write('</pre>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };
    

  return (
    <InvoiceContext.Provider
      value={{
        menu,
        cart,
        invoices,
        addToCart,
        updateQty,
        removeFromCart,
        generateInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
