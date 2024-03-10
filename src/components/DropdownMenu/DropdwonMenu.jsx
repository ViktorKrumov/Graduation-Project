import React from "react";
import { SlActionRedo } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import './DropdownMenu.css';
import { addToCart } from '../../firebase'; 

function DropdownMenu({ isLoggedIn, onAddToCart, onViewDetails, onAddToWishlist, product, userEmail }) {
  const handleAddToCart = () => {
    console.log(product.name)
    console.log(userEmail)
    console.log(product.photo)
    if (isLoggedIn) {
      addToCart(userEmail, product.name, product.photo);
    } else {
      onAddToCart(); 
    }
  };

  return (
    <div className="dropdown-menu">
      {isLoggedIn && (
        <div className="dropdown-menu-item" onClick={handleAddToCart}>Add to cart 🛒</div>
      )}
      
      <Link to={`/product/${product.name}`}>
        <div className="dropdown-menu-item">View Details <SlActionRedo /></div>
      </Link>
     
      {isLoggedIn && (
        <div className="dropdown-menu-item" onClick={onAddToWishlist}>Add to wishlist <FaHeart /></div>
      )}
    </div>
  );
}

export default DropdownMenu;
