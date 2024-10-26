// src/components/Layout.js
import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer'; // Import the Footer component
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
     
      <Navbar />

     
      <div className="container mt-4">
        <Outlet />
      </div>

    
      <Footer />
    </div>
  );
};

export default Layout;
