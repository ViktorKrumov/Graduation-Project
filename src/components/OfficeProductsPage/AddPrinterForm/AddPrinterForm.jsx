import React, { useState } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import "./AddPrinterForm.css"

const AddPrinterForm = () => {
  const [printerData, setPrinterData] = useState({
    category: 'Printer', 
    company: '',
    name: '',
    original_price: '',
    connection: '', 
    printer_technology: '', 
    output: '', 
    paper_format: '', 
    photo: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const officeRef = ref(db, 'office');

    try {
      const snapshot = await get(officeRef);
      const officeProducts = snapshot.val() || [];
      const highestKey = officeProducts.reduce((max, product) => Math.max(max, product.id), 0);

      const nextProductId = highestKey + 1;

      await set(ref(db, `office/${nextProductId}`), { ...printerData, id: nextProductId + 1});

      alert('Printer added successfully!');
     
      setPrinterData({
        category: 'Printer',
        company: '',
        name: '',
        original_price: '',
        connection: '',
        printer_technology: '',
        output: '',
        paper_format: '',
        photo: '',
      });
    } catch (error) {
      console.error('Error adding printer:', error);
      alert('Failed to add printer. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrinterData({ ...printerData, [name]: value });
  };

  return (
    <div className="add-printer-form">
      <h2>Add New Printer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Printer Name:
          <input type="text" name="name" value={printerData.name} onChange={handleInputChange} required/>
        </label>
        <label>
          Company:
          <input type="text" name="company" value={printerData.company} onChange={handleInputChange} required/>
        </label>
        <label>
          Original Price:
          <input type="number" name="original_price" value={printerData.original_price} onChange={handleInputChange} required/>
        </label>
        <label>
          Connection:
          <input type="text" name="connection" value={printerData.connection} onChange={handleInputChange} required/>
        </label>
        <label>
          Printer Technology:
          <input type="text" name="printer_technology" value={printerData.printer_technology} onChange={handleInputChange} required/>
        </label>
        <label>
          Output:
          <input type="text" name="output" value={printerData.output} onChange={handleInputChange} required/>
        </label>
        <label>
          Paper Format:
          <input type="text" name="paper_format" value={printerData.paper_format} onChange={handleInputChange} required/>
        </label>
        <label>
          Photo URL:
          <input type="text" name="photo" value={printerData.photo} onChange={handleInputChange} required/>
        </label>
        <button type="submit">Add Printer</button>
      </form>
    </div>
  );
};

export default AddPrinterForm;
