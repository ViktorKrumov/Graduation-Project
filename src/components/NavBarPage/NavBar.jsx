import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from 'D:/Diplomna/myapp/src/Images/TechnoS-removebg-preview.png';
import './NavBar.css';
import './loginbutton.css';

const NavBar = ({ toggleLoginForm }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <nav className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="logoContainer">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="mobile-menu-toggle" onClick={handleMobileMenuToggle}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        
        <ul className={`nav-list ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <NavLink exact to="/" className="listItem" activeClassName="active" onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/store" className="listItem" activeClassName="active" onClick={closeMobileMenu}>
              Store
            </NavLink>
          </li>
          <li>
            <NavLink to="/trendy" className="listItem" activeClassName="active" onClick={closeMobileMenu}>
              Trendy
            </NavLink>
          </li>
          <li>
            <NavLink to="/laboratory" className="listItem" activeClassName="active" onClick={closeMobileMenu}>
              Laboratory
            </NavLink>
          </li>
          <li>
            <button className="LoginBtn" onClick={toggleLoginForm}>
              Login/Register
            </button>
            
            
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
