import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import DropdownMenu from "../../DropdownMenu/DropdwonMenu";
import EditProductForm from "../../DropdownMenu/EditProductFrom"; // Corrected the import name
import "./ProductCard.css";

function ProductCard({ product, isLoggedIn, userEmail }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to control edit form visibility

  function handleAddToCart() {
    // addToCart(product);
    toast.success("Added to Cart");
  }

  // Function to toggle edit form visibility
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
        <p>{product.processor}</p>
        <p>{product.graphics_card}</p>
        {showDropdown && (
          <DropdownMenu
            isLoggedIn={isLoggedIn}
            product={product}
            userEmail={userEmail}
            onEdit={() => handleToggleEditForm()} // Pass a function to handle edit button click
          />
        )}
        <span className="product-card_bottom">
          <b className="product-card_price">${product.original_price}</b>
        </span>
      </div>
      {/* Conditionally render the edit form */}
      {isEditing && (
        <div className="edit-form-container">
          <EditProductForm
            product={product}
            onSave={() => setIsEditing(false)} // Function to handle save action
            onCancel={() => setIsEditing(false)} // Function to handle cancel action
          />
        </div>
      )}
    </div>
  );
}

export default ProductCard;
