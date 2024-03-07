import React from "react";
import { SlActionRedo } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import './DropdownMenu.css';

function DropdownMenu({ onAddToCart, onViewDetails, onAddToWishlist, product }) {
  return (
    <div className="dropdown-menu">
      <div className="dropdown-menu-item" onClick={onAddToCart}>Add to cart 🛒</div>
      
      <Link to={`/product/${product.name}`}>
        <div className="dropdown-menu-item">View Details <SlActionRedo /></div>
      </Link>
     
      <div className="dropdown-menu-item" onClick={onAddToWishlist}>Add to wishlist <FaHeart /></div>
    </div>
  );
}

export default DropdownMenu;
