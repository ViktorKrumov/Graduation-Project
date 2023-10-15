import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from 'D:/Diplomna/myapp/src/Images/TechnoS-removebg-preview.png';
import './NavBar.css';

const NavBar = ({ toggleLoginForm }) => { 
  return (
    <header>
      <nav className="navbar">
        <div className="logoContainer">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <ul className="nav-list">
          <li>
            <NavLink exact to="/" className="listItem" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/store" className="listItem" activeClassName="active">
              Store
            </NavLink>
          </li>
          <li>
            <NavLink to="/trendy" className="listItem" activeClassName="active">
              Trendy
            </NavLink>
          </li>
          <li>
            <NavLink to="/laboratory" className="listItem" activeClassName="active">
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
