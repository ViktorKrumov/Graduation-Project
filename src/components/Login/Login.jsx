import React, { useState } from 'react';
import './Login.css';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyDlb-kd6pQy8mCf4Y19X98tqCFseg2bT6A",
  authDomain: "technoshack-cbd13.firebaseapp.com",
  projectId: "technoshack-cbd13",
  storageBucket: "technoshack-cbd13.appspot.com",
  messagingSenderId: "61352720868",
  appId: "1:61352720868:web:84164ee51dc88043552ff1",
  measurementId: "G-93RE6G13KP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = ({ closeLoginForm }) => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleRegister = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
       
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <div className="login-form-overlay">
      <div className={`login-form ${isRegister ? 'register-form' : ''}`}>
        <button className="close-button" onClick={closeLoginForm}>
          X
        </button>
        <form onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;

          if (isRegister) {
            const confirmPassword = e.target.confirmPassword.value;
            if (password === confirmPassword) {
              handleRegister(email, password);
            } else {
              
            }
          } else {
            handleLogin(email, password);
          }
        }}>
          <label>Email: <input type="text" name="email" /></label>
          <label>Password: <input type="password" name="password" /></label>
          {isRegister && (
            <label>Confirm Password: <input type="password" name="confirmPassword" /></label>
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
