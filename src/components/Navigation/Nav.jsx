import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SlMagnifier } from 'react-icons/sl';
import { FiHeart } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai';
import { fetchData as fetchComputersData } from '../api2';
import { fetchData as fetchMonitorsData } from '../api3';
import { fetchData as fetchMiceData } from '../api4';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeAPI, setActiveAPI] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(true);

  useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case '/store/pc':
        setActiveAPI('computers');
        setShowSearchBar(true);
        break;
      case '/store/mice':
        setActiveAPI('mice');
        setShowSearchBar(true);
        break;
      case '/store/monitors':
        setActiveAPI('monitors');
        setShowSearchBar(true);
        break;
      default:
        setActiveAPI('');
        setShowSearchBar(false);
    }
  }, [location]);

  const toggleDropdown = () => {
    const dropdownMenu = document.querySelector('.dropdown-content');
    dropdownMenu.classList.toggle('show');
  };


  const fetchSuggestions = async (inputValue) => {
    try {
      let data;
      switch (activeAPI) {
        case 'computers':
          data = await fetchComputersData();
          break;
        case 'monitors':
          data = await fetchMonitorsData();
          break;
        case 'mice':
          data = await fetchMiceData();
          break;
        default:
          break;
      }

      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredData);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (item) => {
    console.log(`Clicked on ${item.photo_url}`);
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
      {showSearchBar && (
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

          <div className="profile-container">
            <a href="#">
              <FiHeart className="nav-icons" />
            </a>
            <Link to="/cart">
              <AiOutlineShoppingCart className="nav-icons" />
            </Link>
            <div className="dropdown" onClick={toggleDropdown}>
              <a href="#" className="dropbtn">
                <AiOutlineUserAdd className="nav-icons" />
              </a>
              <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <Link to="/login">Log in</Link>
                <Link to="/register">Register</Link>
                <Link to="/others">Others</Link>
              </div>
            </div>
          </div>
        </nav>
      )}

      {suggestions.length > 0 && (
        <div className="suggestions-container">
          <ul className="suggestions-container">
            {suggestions.map((item) => (
              <li key={item.id} onClick={() => handleSuggestionClick(item)}>
                <img src={item.photo} alt={item.name} />
                <div>
                  <span className="suggestion-name">{item.name}</span>
                  <span className="suggestion-price">Price: {item.original_price} лв</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Nav;
