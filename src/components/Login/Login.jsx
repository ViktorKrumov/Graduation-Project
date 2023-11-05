import React, { useState } from 'react';
import './Login.css';

const Login = ({ closeLoginForm }) => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="login-form-overlay">
      <div className={`login-form ${isRegister ? 'register-form' : ''}`}>
        <button className="close-button" onClick={closeLoginForm}>
          X
        </button>
        <form>
          <label>Email: <input type="text" /></label>
          <label>Password: <input type="password" /></label>
          {isRegister && (
            <label>Confirm Password: <input type="password" /></label>
          )}
          <button type="submit" className="submit-button">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <p onClick={toggleForm} className="toggle-form">
          {isRegister ? 'I already have an account' : 'Create an account'}
        </p>
      </div>
    </div>
  );
}

export default Login;

