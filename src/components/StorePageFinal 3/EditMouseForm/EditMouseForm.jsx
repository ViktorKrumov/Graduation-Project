import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import "./EditMouseForm.css"

function EditProductForm({ product, onSave, onCancel }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = async () => {
    try {
      const db = getDatabase(); // Initialize the database
      const productRef = ref(db, `mice/${product.id - 1}`);

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
    <h2>Edit Mouse</h2>
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
      <label>Company:</label>
      <input type="text" name="company" value={editedProduct.company} onChange={handleChange} />
      <label>Original Price:</label>
      <input type="number" name="original_price" value={editedProduct.original_price} onChange={handleChange} />
      <label>DPI:</label>
      <input type="text" name="DPI" value={editedProduct.DPI} onChange={handleChange} />
      <label>Color:</label>
      <input type="text" name="color" value={editedProduct.color} onChange={handleChange} />
      <label>Connection:</label>
      <input type="text" name="connection" value={editedProduct.connection} onChange={handleChange} />
      <label>Photo URL:</label>
      <input type="text" name="photo" value={editedProduct.photo} onChange={handleChange} />
      <label>Weight:</label>
      <input type="text" name="weight" value={editedProduct.weight} onChange={handleChange} />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  </div>
  );
}

export default EditProductForm;
