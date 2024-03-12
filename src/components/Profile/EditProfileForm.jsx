import React, { useState } from 'react';
import './Profile.css'; 

const EditProfileForm = ({ userData, onSave, onCancel }) => {
  const [updatedUserData, setUpdatedUserData] = useState(userData);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
   
    setErrors({ ...errors, [name]: '' });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = {};
    if (!updatedUserData.fullName.trim()) {
      validationErrors.fullName = 'Full Name is required';
    }
    if (!updatedUserData.phoneNumber.trim() || isNaN(updatedUserData.phoneNumber)) {
      validationErrors.phoneNumber = 'Phone Number must be a valid number';
    }
   
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      
      onSave(updatedUserData, photo); 
    }
  };

  return (
    <div className="edit-profile-form-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={updatedUserData.email} disabled />
        <label>Full Name:</label>
        <input type="text" name="fullName" value={updatedUserData.fullName} onChange={handleChange} />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
        <label>Bio:</label>
        <textarea name="bio" value={updatedUserData.bio} onChange={handleChange} />
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={updatedUserData.phoneNumber} onChange={handleChange} />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={updatedUserData.dateOfBirth} onChange={handleChange} />
        <label>Address:</label>
        <input type="text" name="address" value={updatedUserData.address} onChange={handleChange} />
        <label>Upload Photo:</label>
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProfileForm;
