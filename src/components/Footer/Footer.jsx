import React from 'react'
import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3>About Ikka Store</h3>
            <p>
              Your trusted online marketplace for premium products. We deliver quality and excellence to your doorstep.
            </p>
            <div className="social-links">
              <a href="#" target="_blank" rel="noreferrer">
                <FiFacebook />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <FiTwitter />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <FiInstagram />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <FiLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/orders">Orders</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Return & Exchange</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FiPhone />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FiMail />
                <span>support@ikkastore.com</span>
              </div>
              <div className="contact-item">
                <FiMapPin />
                <span>123 Main Street, City, Country</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Ikka Store. All rights reserved.</p>
          <div className="payment-methods">
            <span>We Accept:</span>
            <img src="/payment-icons.png" alt="Payment Methods" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
