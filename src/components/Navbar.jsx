// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        <Link className="text-2xl font-semibold text-white hover:text-indigo-400" to="/dashboard">
          EduTrack
        </Link>
        <button 
          className="text-white md:hidden focus:outline-none" 
          type="button" 
          aria-label="Toggle navigation"
        >
          <span className="text-2xl">&#9776;</span>
        </button>
        <div className="hidden md:flex space-x-4">
          <Link className="hover:text-indigo-400 transition" to="/dashboard">Dashboard</Link>
          <Link className="hover:text-indigo-400 transition" to="/students">Student List</Link>
          <Link className="hover:text-indigo-400 transition" to="/register">Register Student</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
