import React, { useState } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import "./AddProductForm.css"

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    category: '',
    color: '',
    company: '',
    discounted_price: '',
    graphics_card: '',
    memory: '',
    name: '',
    operating_system: '',
    original_price: '',
    photo: '',
    processor: '',
    storage: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const productsRef = ref(db, 'computers');

    try {
      const snapshot = await get(productsRef);
      const products = snapshot.val() || {};
      const highestKey = Object.keys(products)
        .filter(key => !isNaN(key))
        .reduce((max, key) => Math.max(max, parseInt(key)), 0);

      const nextProductId = highestKey + 1;

      await set(ref(db, `computers/${nextProductId}`), { ...productData, id: nextProductId + 1});

      alert('Product added successfully!');
      // Clear form fields after submission
      setProductData({
        category: '',
        color: '',
        company: '',
        discounted_price: '',
        graphics_card: '',
        memory: '',
        name: '',
        operating_system: '',
        original_price: '',
        photo: '',
        processor: '',
        storage: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" name="name" value={productData.name} onChange={handleInputChange}  required/>
        </label>
        <label>
          Price:
          <input type="number" name="price" value={productData.price} onChange={handleInputChange}  required/>
        </label>
        <label>
          Category:
          <input type="text" name="category" value={productData.category} onChange={handleInputChange}  required/>
        </label>
        <label>
          Color:
          <input type="text" name="color" value={productData.color} onChange={handleInputChange}  required/>
        </label>
        <label>
          Company:
          <input type="text" name="company" value={productData.company} onChange={handleInputChange}  required/>
        </label>
        <label>
          Processor:
          <input type="text" name="processor" value={productData.processor} onChange={handleInputChange}  required/>
        </label>
        <label>
          Graphics Card:
          <input type="text" name="graphics_card" value={productData.graphics_card} onChange={handleInputChange}  required/>
        </label>
        <label>
          Memory:
          <input type="text" name="memory" value={productData.memory} onChange={handleInputChange}  required/>
        </label>
        <label>
          Operating System:
          <input type="text" name="operating_system" value={productData.operating_system} onChange={handleInputChange}  required/>
        </label>
        <label>
          Original Price:
          <input type="number" name="original_price" value={productData.original_price} onChange={handleInputChange}  required/>
        </label>
        <label>
          Photo URL:
          <input type="text" name="photo" value={productData.photo} onChange={handleInputChange}  required/>
        </label>
        <label>
          Storage:
          <input type="text" name="storage" value={productData.storage} onChange={handleInputChange}  required/>
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
