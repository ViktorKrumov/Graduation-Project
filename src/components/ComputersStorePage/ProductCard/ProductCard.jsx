import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import DropdownMenu from "../../DropdownMenu/DropdwonMenu";
import EditProductForm from "../EditPcForm/EditProductFrom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 

  const handleToggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Product edited successfully');
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
            product={product}
            onEdit={() => handleToggleEditForm()} 
            databaseNode="computers"
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
            onSave={handleSave}
            onCancel={() => setIsEditing(false)} 
          />
        </div>
      )}
    </div>
  );
}

export default ProductCard;
