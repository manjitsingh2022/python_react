import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for header styles

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container"> {/* Added container for better layout */}
          <Link to="/" className="navbar-brand">
            Your App Name {/* Replace with your actual app name or logo */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto"> {/* Align links to the right */}
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {/* Uncomment the following to add a "Pokemon" link */}
              {/* <li className="nav-item">
                <Link to="/pokemon" className="nav-link">
                  Pokemon
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
