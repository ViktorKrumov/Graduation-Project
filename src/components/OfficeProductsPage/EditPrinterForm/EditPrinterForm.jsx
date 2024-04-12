import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import "./EditPrinterForm.css";

function EditPrinterForm({ product, onSave, onCancel }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = async () => {
    try {
      const db = getDatabase(); 
      const productRef = ref(db, `office/${product.id - 1}`);

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
      <h2>Edit Printer</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
        <label>Company:</label>
        <input type="text" name="company" value={editedProduct.company} onChange={handleChange} />
        <label>Original Price:</label>
        <input type="number" name="original_price" value={editedProduct.original_price} onChange={handleChange} />
        <label>Connection:</label>
        <input type="text" name="connection" value={editedProduct.connection} onChange={handleChange} />
        <label>Output:</label>
        <input type="text" name="output" value={editedProduct.output} onChange={handleChange} />
        <label>Printer Technology:</label>
        <input type="text" name="printer_technology" value={editedProduct.printer_technology} onChange={handleChange} />
        <label>Paper Format:</label>
        <input type="text" name="paper_format" value={editedProduct.paper_format} onChange={handleChange} />
        <label>Photo URL:</label>
        <input type="text" name="photo" value={editedProduct.photo} onChange={handleChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditPrinterForm;
