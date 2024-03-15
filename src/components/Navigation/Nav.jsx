import React, { useState, useEffect } from 'react';
import { SlMagnifier } from 'react-icons/sl';
import { FiHeart } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { fetchData as fetchComputersData } from '../api2';
import { fetchData as fetchMonitorsData } from '../api3';
import { fetchData as fetchMiceData } from '../api4';
import './Nav.css';

function Nav({ isLoggedIn, handleLogout, userEmail }) {
  const [queryTest, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(true); 

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    let unsubscribeWishlist;
    let unsubscribeCart;
  
    const fetchWishlistCount = async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, 'Wishlist'), where('email', '==', userEmail));
  
        unsubscribeWishlist = onSnapshot(q, (snapshot) => {
          setWishlistCount(snapshot.size);
        });
      } catch (error) {
        console.error('Error fetching wishlist count:', error);
      }
    };
  
    const fetchCartCount = async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, 'Cart'), where('email', '==', userEmail));
  
        unsubscribeCart = onSnapshot(q, (snapshot) => {
          setCartCount(snapshot.size);
        });
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };
  
    if (isLoggedIn && userEmail) {
      fetchWishlistCount();
      fetchCartCount();
    }
  
    return () => {
      if (unsubscribeWishlist) unsubscribeWishlist();
      if (unsubscribeCart) unsubscribeCart();
    };
  }, [isLoggedIn, userEmail]);
  


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
    setShowSuggestions(false); 
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    if (inputValue.trim() !== '') {
      setShowSuggestions(true); 
      fetchSuggestions(inputValue);
    } else {
      setShowSuggestions(false); 
      setSuggestions([]);
    }
  };

  return (
    <>
      <nav className="navContainer">
      <div className="search-container">
          <input
            type="text"
            className={`search-input ${isSearchOpen ? 'open' : ''}`}
            placeholder="Search your products here"
            value={queryTest}
            onChange={handleInputChange}
          />
          <SlMagnifier className="nav-magnifier" onClick={toggleSearch} />
        </div>

        <div className="nav-profile-container">
          {isLoggedIn && (
            <Link to="/cart">
              <div className="cart-container">
                <AiOutlineShoppingCart className="nav-icons" />
                {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
              </div>
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/wishlist">
              <div className="wishlist-container">
                <FiHeart className="nav-icons" />
                {wishlistCount > 0 && <span className="wishlist-counter">{wishlistCount}</span>}
              </div>
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
                  <Link to="/" onClick={handleLogout}>Log out</Link>
                </>
              ) : (
                <Link to="/login">Log in</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showSuggestions && suggestions.length > 0 && (
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
