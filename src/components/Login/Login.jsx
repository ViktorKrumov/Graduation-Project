import React from 'react';
import './Login.css';

const Login = ({ closeLoginForm }) => {
  return (
    <div className="login-form-overlay">
      <div className="login-form">
        <button className="close-button" onClick={closeLoginForm}>
          X
        </button>
        {/* Your login form content here */}
        <form>
          <label>Email: <input type="text" /></label>
          <label>Password: <input type="password" /></label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
