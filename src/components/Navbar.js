import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Rajshahi Namkeen</h1>
      <div>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>Dashboard</NavLink>
        <NavLink to="/billing" className={({ isActive }) => (isActive ? 'active-link' : '')}>Billing</NavLink>
        <NavLink to="/invoices" className={({ isActive }) => (isActive ? 'active-link' : '')}>Invoices</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
