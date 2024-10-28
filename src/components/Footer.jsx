import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'; // Importing social icons

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
       
        <div className="footer-section">
          <h2 className="footer-logo">EduTrack</h2>
          <p className="footer-description">
            track your students at one place crafted just for you.
          </p>
        </div>

        
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
          
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/students">Student List</Link>
            </li>
            <li>
              <Link to="/register">Register Student</Link>
            </li>
          </ul>
        </div>

    
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <p>
            <strong>Address:</strong> 123 kolkata
          </p>
          <p>
            <strong>Email:</strong> EduTr@ck.com
          </p>
          <p>
            <strong>Phone:</strong> 9297781321
          </p>
        </div>

       
        <div className="footer-section">
          <h3 className="footer-heading">Opening Hours</h3>
          <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
        
        </div>

       
        <div className="footer-section footer-socials">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EduTrack. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
