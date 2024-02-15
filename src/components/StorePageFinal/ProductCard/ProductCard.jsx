
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import DropdownMenu from "../DropdownMenu/DropdwonMenu";
import "./ProductCard.css";

function ProductCard({ product }) {
  const [showDropdown, setShowDropdown] = useState(false);

  function handleAddToCart() {
    // addToCart(product);
    toast.success("Added to Cart");
  }

  return (
    <div
      className="product-card_wrapper"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
     
        <div className="product-card_img">
          <img src={product.photo_url} alt={product.name} />
        </div>
      
      <div className="product-card_description">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        {showDropdown && (
          <DropdownMenu
            // onAddToCart={handleAddToCart}
            product={product} 
          />
        )}
        <span className="product-card_bottom">
          
          <b className="product-card_price">${product.original_price}</b>
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
