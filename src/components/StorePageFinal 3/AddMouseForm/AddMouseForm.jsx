import React, { useState } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import "./AddMouseForm.css"

const AddMouseForm = () => {
  const [productData, setProductData] = useState({
    DPI: '',
    color: '',
    company: '',
    connection: '',
    name: '',
    original_price: '',
    photo: '',
    weight: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const miceRef = ref(db, 'mice');

    try {
      const snapshot = await get(miceRef);
      const mice = snapshot.val() || {};
      const highestKey = Object.keys(mice)
        .filter(key => !isNaN(key))
        .reduce((max, key) => Math.max(max, parseInt(key)), 0);

      const nextMouseId = highestKey + 1;

      await set(ref(db, `mice/${nextMouseId}`), { ...productData, id: nextMouseId + 1});

      alert('Mouse added successfully!');
      // Clear form fields after submission
      setProductData({
        DPI: '',
        color: '',
        company: '',
        connection: '',
        name: '',
        original_price: '',
        photo: '',
        weight: '',
      });
    } catch (error) {
      console.error('Error adding mouse:', error);
      alert('Failed to add mouse. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  return (
    <div className="add-mouse-form">
      <h2>Add New Mouse</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Mouse Name:
          <input type="text" name="name" value={productData.name} onChange={handleInputChange} />
        </label>
        <label>
          Company:
          <input type="text" name="company" value={productData.company} onChange={handleInputChange} />
        </label>
        <label>
          Original Price:
          <input type="number" name="original_price" value={productData.original_price} onChange={handleInputChange} />
        </label>
        <label>
          DPI:
          <input type="text" name="DPI" value={productData.DPI} onChange={handleInputChange} />
        </label>
        <label>
          Color:
          <input type="text" name="color" value={productData.color} onChange={handleInputChange} />
        </label>
        <label>
          Connection:
          <input type="text" name="connection" value={productData.connection} onChange={handleInputChange} />
        </label>
        <label>
          Photo URL:
          <input type="text" name="photo" value={productData.photo} onChange={handleInputChange} />
        </label>
        <label>
          Weight:
          <input type="text" name="weight" value={productData.weight} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Mouse</button>
      </form>
    </div>
  );
};

export default AddMouseForm;
