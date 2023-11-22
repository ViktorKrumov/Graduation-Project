import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutConfirmation.css';

const LogoutConfirmation = ({ confirmLogout }) => {
  const navigate = useNavigate();

  const handleConfirmLogout = (confirmed) => {
    confirmLogout(confirmed);
    if (confirmed) {
      navigate('/');
    }
  };

  const handleOverlayClick = () => {
    
    handleConfirmLogout(false);
  };

  const handleFormClick = (e) => {
    
    e.stopPropagation();
  };

  return (
    <div className="logout-confirmation-overlay" onClick={handleOverlayClick}>
      <div className="logout-confirmation-form" onClick={handleFormClick}>
        <p>Are you sure you want to logout?</p>
        <button onClick={() => handleConfirmLogout(true)}>Yes</button>
        <button onClick={() => handleConfirmLogout(false)}>No</button>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
