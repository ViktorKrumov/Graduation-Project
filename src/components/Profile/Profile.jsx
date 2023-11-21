
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ isLoggedIn, handleLogout, toggleLoginForm }) => {
  const navigate = useNavigate();

  return (
    <div>
      
      <button onClick={() => handleLogout()}>Logout</button>
      <button onClick={() => toggleLoginForm()}>Toggle Login Form</button>
    </div>
  );
};

export default Profile;
