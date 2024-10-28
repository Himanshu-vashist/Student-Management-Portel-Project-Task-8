
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link className="text-2xl font-semibold text-white hover:text-indigo-400" to="/dashboard">
          EduTrack
        </Link>
        <button 
          className="text-white md:hidden focus:outline-none" 
          type="button" 
          aria-label="Toggle navigation"
          onClick={toggleMobileMenu}
        >
          <span className="text-2xl">&#9776;</span>
        </button>
        <div className={`hidden md:flex space-x-4 ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <Link className="hover:text-indigo-400 transition" to="/dashboard">Dashboard</Link>
          <Link className="hover:text-indigo-400 transition" to="/students">Student List</Link>
          <div className="relative" ref={dropdownRef}>
            <button 
              className="hover:text-indigo-400 transition focus:outline-none" 
              onClick={toggleDropdown}
            >
              Dropdown
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white text-gray-800 shadow-lg rounded-md mt-2 w-48 z-10">
                <Link className="block px-4 py-2 hover:bg-indigo-500 hover:text-white" to="/attendance">Attendance</Link>
                <Link className="block px-4 py-2 hover:bg-indigo-500 hover:text-white" to="/library">Library</Link>
                <Link className="block px-4 py-2 hover:bg-indigo-500 hover:text-white" to="/timetable">Timetable</Link>
                <div className="border-t border-gray-200"></div>
                <Link className="block px-4 py-2 hover:bg-indigo-500 hover:text-white" to="/assignments">AssignmentTracker</Link>
              </div>
            )}
          </div>
          <Link className="hover:text-indigo-400 transition" to="/register">Register Student</Link>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <Link className="block px-4 py-2 hover:bg-indigo-500 hover:text-white" to="/dashboard">Dashboard</Link>
          <Link className="block px-4 py-2 hover:bg-indigo-500 hover:text-white" to="/students">Student List</Link>
          <div className="relative" ref={dropdownRef}>
            <button 
              className="block w-full text-left hover:bg-indigo-500 hover:text-white" 
              onClick={toggleDropdown}
            >
              Dropdown
            </button>
            {isDropdownOpen && (
              <div className="bg-white text-gray-800 shadow-lg rounded-md mt-2 w-full z-10">
                <Link className="block px-4 py-2 hover:bg-indigo-500 hover:text-white" to="/attendance">Attendance</Link>
                <Link className="block px-4 py-2 hover:bg-indigo-500 hover:text-white" to="/library">Library</Link>
                <Link className="block px-4 py-2 hover:bg-indigo-500 hover:text-white" to="/timetable">Timetable</Link>
                <div className="border-t border-gray-200"></div>
                <Link className="block px-4 py-2 hover:bg-indigo-500 hover:text-white" to="/assignments">AssignmentTracker</Link>
              </div>
            )}
          </div>
          <Link className="block px-4 py-2 hover:bg-indigo-500 hover:text-white" to="/register">Register Student</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
