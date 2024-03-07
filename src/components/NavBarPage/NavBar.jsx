import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { Button } from './Button';

const NavBar = ({ toggleLoginForm, isLoggedIn, handleLogout }) => {
  const [click, setClick] = useState(false);
  const [productClick, setProductClick] = useState(false); 

  const handleProductsClick = () => {
    setProductClick(!productClick); 
  };

  const closeMobileMenu = () => {
    setClick(false);
    setProductClick(false); 
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            TechnoShack
          </Link>
          <div className='menu-icon' onClick={() => setClick(!click)}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <div className='nav-links' onClick={handleProductsClick}>
                Products <i className='fas fa-caret-down' />
              </div>
              <ul className={productClick ? 'dropdown-menu active' : 'dropdown-menu'}>
                <li className='dropdown-item'>
                  <Link to='/store/pc' className='dropdown-link' onClick={closeMobileMenu}>PC</Link>
                </li>
                <li className='dropdown-item'>
                  <Link to='/store/monitors' className='dropdown-link' onClick={closeMobileMenu}>Monitors</Link>
                </li>
                <li className='dropdown-item'>
                  <Link to='/store/mice' className='dropdown-link' onClick={closeMobileMenu}>PC Mice</Link>
                </li>
              </ul>
            </li>
            <li className='nav-item'>
              <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                Services
              </Link>
            </li>
            
          </ul>
          {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
