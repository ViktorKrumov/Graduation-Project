import React from 'react';
import './Profile.css'; 

const ProfileInfo = ({ userData, onEdit }) => {
  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-info-container"> 
      <h2>My Profile</h2>
      {userData.photo ? (
        <img src={userData.photo} alt="User" className="profile-photo" />
      ) : (
        <div className="profile-photo-placeholder" />
      )}
      <div className="info-box">
        <p><strong>Email:</strong> {userData.email}</p>
      </div>
      <div className="info-box">
        <p><strong>Full Name:</strong> {userData.fullName}</p>
      </div>
      <div className="info-box">
        <p><strong>Bio:</strong> {userData.bio}</p>
      </div>
      <div className="info-box">
        <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
      </div>
      <div className="info-box">
        <p><strong>Date of Birth:</strong> {userData.dateOfBirth}</p>
      </div>
      <div className="info-box">
        <p><strong>Address:</strong> {userData.address}</p>
      </div>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

export default ProfileInfo;
