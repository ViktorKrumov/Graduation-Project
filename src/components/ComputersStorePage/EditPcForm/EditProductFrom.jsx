import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import "./EditProductForm.css"

function EditProductForm({ product, onSave, onCancel }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = async () => {
    try {
      const db = getDatabase(); // Initialize the database
      const productRef = ref(db, `computers/${product.id - 1}`);

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
        <label>Category:</label>
        <input type="text" name="category" value={editedProduct.category} onChange={handleChange} />
        <label>Color:</label>
        <input type="text" name="color" value={editedProduct.color} onChange={handleChange} />
        <label>Company:</label>
        <input type="text" name="company" value={editedProduct.company} onChange={handleChange} />
        <label>Discounted Price:</label>
        <input type="number" name="discounted_price" value={editedProduct.discounted_price} onChange={handleChange} />
        <label>Graphics Card:</label>
        <input type="text" name="graphics_card" value={editedProduct.graphics_card} onChange={handleChange} />
        <label>Memory:</label>
        <input type="text" name="memory" value={editedProduct.memory} onChange={handleChange} />
        <label>Operating System:</label>
        <input type="text" name="operating_system" value={editedProduct.operating_system} onChange={handleChange} />
        <label>Original Price:</label>
        <input type="number" name="original_price" value={editedProduct.original_price} onChange={handleChange} />
        <label>Photo URL:</label>
        <input type="text" name="photo" value={editedProduct.photo} onChange={handleChange} />
        <label>Processor:</label>
        <input type="text" name="processor" value={editedProduct.processor} onChange={handleChange} />
        <label>Storage:</label>
        <input type="text" name="storage" value={editedProduct.storage} onChange={handleChange} />
        <button type="submit">Save</button>
        <button className="CancelButton" type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditProductForm;
