import React from 'react';
import './footer.css';

const Footer = () => {
  const logoUrl =
    'https://images.unsplash.com/photo-1611279522012-6c3e2d2c604f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=230&ixid=MnwxfDB8MXxyYW5kb218MHx8c2hvcHBpbmd8fHx8fHwxNjg5NjcyMTI1&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=570';

  return (
    <footer className="footer bg-dark text-white">
      <div className="container">
        <div className="footer-content d-flex justify-content-between align-items-center">
          <div className="footer-logo">
            <img src={logoUrl} alt="Logo" className="img-fluid" />
          </div>
          <div className="footer-links">
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-text text-center py-3">
          &copy; {new Date().getFullYear()} Your App Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
