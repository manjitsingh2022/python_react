import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import './Sidebar.css';
import { IoMdHome, IoIosSettings, IoMdArrowDropright, IoMdMail } from 'react-icons/io';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/">
            <IoMdHome />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/admin">
            <IoIosSettings />
            <span>Admin</span>
          </Link>
        </li>
        <li>
          <Link to="/send-mail">
            <IoMdMail />
            <span>SendMail</span>
          </Link>
        </li>
        <li>
          <Link to="/test">
            <IoMdMail />
            <span>Test</span>
          </Link>
        </li>
        <li>
          <div className={`sidebar-submenu-toggle ${isOpen ? 'rotate-icon' : ''}`} onClick={handleToggle}>
          <IoIosSettings />
            <span>Settings</span>

            <IoMdArrowDropright className={`rotate-icon ${isOpen ? 'rotate-icon-open' : ''}`} />
          </div>
          <Collapse in={isOpen}>
            <ul className="sidebar-submenu">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">
                  <span>Logout</span>
                </Link>
              </li>
              <li>
                <Link to="/changepassword">Change Password</Link>
              </li>
            </ul>
          </Collapse>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
