import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import DropdownMenu from "../../DropdownMenu/DropdwonMenu";
import EditProductForm from "../EditMonitorForm/EditMonitorForm";
import "./ProductCard2.css";

function ProductCard2({ product, isLoggedIn, userEmail }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  function handleAddToCart() {
    // addToCart(product);
    toast.success("Added to Cart");
  }

  
  const handleToggleEditForm = () => {
    setIsEditing(!isEditing);
  };

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
            {showDropdown && (
              <DropdownMenu
                isLoggedIn={isLoggedIn}
                product={product}
                userEmail={userEmail}
                onEdit={() => handleToggleEditForm()} 
                databaseNode="monitors"
              />
            )}
      <span className="product-card_bottom">
        <b className="product-card_price">${product.original_price}</b>
      </span>
    </div>


      {isEditing && (
        <div className="edit-form-container">
          <EditProductForm
            product={product}
            onSave={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)} 
          />
        </div>
      )}
    </div>
  );
}

export default ProductCard2;
