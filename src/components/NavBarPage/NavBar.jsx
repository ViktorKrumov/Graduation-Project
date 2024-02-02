import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { Button } from './Button';

const NavBar = ({ toggleLoginForm, isLoggedIn, handleLogout }) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);


  

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            TechnoShack
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/store'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>


            <li className='nav-item'>
              {isLoggedIn ? (
                <Link to="/profile" className="nav-links" activeClassName="active" onClick={closeMobileMenu}>
                  Profile
                </Link>
              ) : (
                <Button buttonStyle='btn--outline' onClick={toggleLoginForm}>
                  Login/Register
                </Button>
              )}
            </li>


          </ul>
          {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
