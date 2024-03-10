import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ handleLogout, userEmail }) => {
  const navigate = useNavigate();

  return (
    <div>
      {userEmail && <p>Hello {userEmail}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
