import React from 'react';
import './Profile.css'; 

const ProfileInfo = ({ userData, onEdit }) => {
  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-info-container"> 
      <h2>User Profile</h2>
      {userData.photo && <img src={userData.photo} alt="User" className="profile-photo" />}
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Full Name:</strong> {userData.fullName}</p>
      <p><strong>Bio:</strong> {userData.bio}</p>
      <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
      <p><strong>Date of Birth:</strong> {userData.dateOfBirth}</p>
      <p><strong>Address:</strong> {userData.address}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

export default ProfileInfo;
