import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import "./EditMonitorForm.css"

function EditProductForm({ product, onSave, onCancel }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = async () => {
    try {
      const db = getDatabase(); // Initialize the database
      const productRef = ref(db, `monitors/${product.id - 1}`);

      await set(productRef, editedProduct);
      onSave(editedProduct);
    } catch (error) {
      console.error("Error saving product data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <div className="edit-product-form-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
            <label>Company:</label>
            <input type="text" name="company" value={editedProduct.company} onChange={handleChange} />
            <label>Original Price:</label>
            <input type="number" name="original_price" value={editedProduct.original_price} onChange={handleChange} />
            <label>Panel Type:</label>
            <input type="text" name="panel_type" value={editedProduct.panel_type} onChange={handleChange} />
            <label>Photo URL:</label>
            <input type="text" name="photo" value={editedProduct.photo} onChange={handleChange} />
            <label>Refresh Rate:</label>
            <input type="text" name="refresh_rate" value={editedProduct.refresh_rate} onChange={handleChange} />
            <label>Resolution:</label>
            <input type="text" name="resolution" value={editedProduct.resolution} onChange={handleChange} />
            <label>Screen Size:</label>
            <input type="text" name="screen_size" value={editedProduct.screen_size} onChange={handleChange} />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>

    </div>
  );
}

export default EditProductForm;
