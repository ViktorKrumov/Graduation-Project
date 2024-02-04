
import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai';
import { SlMagnifier } from 'react-icons/sl';
import { fetchData } from '../api'
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (inputValue) => {
    try {
      const computers = await fetchData();
      const filteredComputers = computers.filter((computer) =>
        computer.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredComputers);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (computer) => {
    
    console.log(`Clicked on ${computer.photo_url}`);
   
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
            placeholder="Enter a computer"
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
            
          
          <a href="#">
            <AiOutlineUserAdd className="nav-icons" />
          </a>
        </div>
      </nav>

      
      {suggestions.length > 0 && (
        <div className="suggestions-container">
          <ul className="suggestions-container">
  {suggestions.map((computer) => (
    <li key={computer.id} onClick={() => handleSuggestionClick(computer)}>
      <img src={computer.photo_url} alt={computer.name} />
      <div>
        <span className="suggestion-name">{computer.name}</span>
        <span className="suggestion-price">Price: {computer.original_price} лв</span>
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
