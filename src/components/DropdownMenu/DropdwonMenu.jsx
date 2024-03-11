import React from "react";
import { SlActionRedo } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import './DropdownMenu.css';
import { addToCart } from '../../firebase'; 
import { addToWishlist } from '../../firebase'; 

function DropdownMenu({ isLoggedIn, onAddToCart, onViewDetails, onAddToWishlist, product, userEmail }) {
  const handleAddToCart = () => {
    console.log(product.name)
    console.log(userEmail)
    console.log(product.photo)
    console.log(product.original_price)
    if (isLoggedIn) {
      addToCart(userEmail, product.name, product.photo, product.original_price);
    } else {
      onAddToCart(); 
    }
  };

  const handleAddToWishlist = () => {
    console.log(product.name)
    console.log(userEmail)
    console.log(product.photo)
    console.log(product.original_price)
    if (isLoggedIn) {
      addToWishlist(userEmail, product.name, product.photo, product.original_price);
    } else {
      onAddToWishlist(); 
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
        <div className="dropdown-menu-item" onClick={handleAddToWishlist}>Add to wishlist <FaHeart /></div>
      )}
    </div>
  );
}

export default DropdownMenu;
