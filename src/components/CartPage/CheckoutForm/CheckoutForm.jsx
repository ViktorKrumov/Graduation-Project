import React, { useState } from 'react';
import './CheckoutForm.css'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipcode: '',
    phoneNumber: '',
    paymentMethod: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    toast.success("Order submitted successfully!"); 
  };

  return (
    <div className="checkout-form-container">
      <h2>Checkout Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="zipcode">Zip Code:</label>
          <input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
