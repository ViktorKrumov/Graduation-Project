import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./ProductCard2.css";

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
        <img src={product.photo} alt={product.name} />
      </div>
      <div className="product-card_description">
        <h3>{product.name}</h3>
        <p>Refresh Rate: {product.refresh_rate}</p>
        <p>Resolution: {product.resolution}</p>
        <p>Screen Size: {product.screen}</p>
       
        <span className="product-card_bottom">
          <b className="product-card_price">${product.original_price}</b>
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
