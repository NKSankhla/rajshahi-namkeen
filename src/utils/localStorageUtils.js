export const saveInvoicesToLocalStorage = (invoices) => {
  try {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  } catch (error) {
    console.error('Error saving invoices to localStorage:', error);
  }
};

export const getInvoicesFromLocalStorage = () => {
  try {
    const invoices = localStorage.getItem('invoices');
    return invoices ? JSON.parse(invoices) : [];
  } catch (error) {
    console.error('Error reading invoices from localStorage:', error);
    return []; // Fallback to an empty array if error occurs
  }
};
