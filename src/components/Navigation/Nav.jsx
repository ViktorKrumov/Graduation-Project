import React, { useState } from 'react';
import { SlMagnifier } from 'react-icons/sl';
import { FiHeart } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai';
import { fetchData as fetchComputersData } from '../api2';
import { fetchData as fetchMonitorsData } from '../api3';
import { fetchData as fetchMiceData } from '../api4';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav({ isLoggedIn, handleLogout }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const toggleDropdown = () => {
    const dropdownMenu = document.querySelector('.dropdown-content');
    dropdownMenu.classList.toggle('show');
  };

  const fetchSuggestions = async (inputValue) => {
    try {
      const computersData = await fetchComputersData();
      const monitorsData = await fetchMonitorsData();
      const miceData = await fetchMiceData();

      const combinedData = [...computersData, ...monitorsData, ...miceData];

      const filteredData = combinedData.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setSuggestions(filteredData);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (product) => {
    console.log(`Clicked on ${product.name}`);
   
     <Link to={`/product/${product.id}`}>
       <div className="dropdown-menu-item">View Details</div>
     </Link>
    
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    if (inputValue.trim() !== '') {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
       <nav className="navContainer">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search your products here"
            value={query}
            onChange={handleInputChange}
          />
          <SlMagnifier className="nav-magnifier" />
        </div>

        <div className="nav-profile-container">
          {isLoggedIn && (
            <Link to="/cart">
              <AiOutlineShoppingCart className="nav-icons" />
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/wishlist">
              <FiHeart className="nav-icons" />
            </Link>
          )}
          <div className="dropdown" onClick={toggleDropdown}>
            <a href="#" className="dropbtn">
              <AiOutlineUserAdd className="nav-icons" />
            </a>
            <div className="dropdown-content">
              {isLoggedIn ? (
                <>
                  <Link to="/profile">Profile</Link>
                  <a href="#" onClick={handleLogout}>Log out</a>
                </>
              ) : (
                <Link to="/login">Log in</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {suggestions.length > 0 && (
        <div className="suggestions-container">
          <ul className="suggestions-container">
            {suggestions.map((product) => (
              <li key={product.id} onClick={() => handleSuggestionClick(product)}>
                <Link to={`/product/${product.name}`}>
                  <img src={product.photo} alt={product.name} />
                  <div>
                    <span className="suggestion-name">{product.name}</span>
                    <span className="suggestion-price">Price: ${product.original_price}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Nav;
