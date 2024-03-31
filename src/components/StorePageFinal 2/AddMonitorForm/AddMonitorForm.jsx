import React, { useState } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import "./AddMonitorForm.css"

const AddMonitorForm = () => {
  const [productData, setProductData] = useState({
    category: '',
    color: '',
    company: '',
    name: '',
    original_price: '',
    panel_type: '',
    photo: '',
    refresh_rate: '',
    resolution: '',
    screen_size: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const monitorsRef = ref(db, 'monitors');

    try {
      const snapshot = await get(monitorsRef);
      const monitors = snapshot.val() || {};
      const highestKey = Object.keys(monitors)
        .filter(key => !isNaN(key))
        .reduce((max, key) => Math.max(max, parseInt(key)), 0);

      const nextMonitorId = highestKey + 1;

      await set(ref(db, `monitors/${nextMonitorId}`), { ...productData, id: nextMonitorId + 1});

      alert('Monitor added successfully!');
      // Clear form fields after submission
      setProductData({
        category: '',
        color: '',
        company: '',
        name: '',
        original_price: '',
        panel_type: '',
        photo: '',
        refresh_rate: '',
        resolution: '',
        screen_size: '',
      });
    } catch (error) {
      console.error('Error adding monitor:', error);
      alert('Failed to add monitor. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  return (
    <div className="add-monitor-form">
      <h2>Add New Monitor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Monitor Name:
          <input type="text" name="name" value={productData.name} onChange={handleInputChange} required/>
        </label>
        <label>
          Company:
          <input type="text" name="company" value={productData.company} onChange={handleInputChange} required/>
        </label>
        <label>
          Original Price:
          <input type="number" name="original_price" value={productData.original_price} onChange={handleInputChange} required/>
        </label>
        <label>
          Panel Type:
          <input type="text" name="panel_type" value={productData.panel_type} onChange={handleInputChange} required/>
        </label>
        <label>
          Photo URL:
          <input type="text" name="photo" value={productData.photo} onChange={handleInputChange} required/>
        </label>
        <label>
          Refresh Rate:
          <input type="text" name="refresh_rate" value={productData.refresh_rate} onChange={handleInputChange} required/>
        </label>
        <label>
          Resolution:
          <input type="text" name="resolution" value={productData.resolution} onChange={handleInputChange} required/>
        </label>
        <label>
          Screen Size:
          <input type="text" name="screen_size" value={productData.screen_size} onChange={handleInputChange} required/>
        </label>
        <button type="submit">Add Monitor</button>
      </form>
    </div>
  );
};

export default AddMonitorForm;
