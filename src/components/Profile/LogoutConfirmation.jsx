import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutConfirmation = ({ confirmLogout }) => {
  const navigate = useNavigate();

  const handleConfirmLogout = (confirmed) => {
    confirmLogout(confirmed);
    if (confirmed) {
      navigate('/');
    }
  };

  const handleOverlayClick = () => {
    // Close the form when clicking outside of it
    handleConfirmLogout(false);
  };

  const handleFormClick = (e) => {
    // Prevent clicking inside the form from closing it
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
