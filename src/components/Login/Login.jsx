import React, { useState } from 'react';
import './Login.css';
import { initializeApp } from 'firebase/app';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from '../../firebase';

const Login = ({ closeLoginForm, handleLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailForPasswordReset, setEmailForPasswordReset] = useState('');
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setForgotPassword(false);
    setShowPasswordWarning(false);
  };

  const handleRegister = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        closeLoginForm();
        handleLoginSuccess(); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const handleLogin = (email, password) => {
    if (forgotPassword) {
      sendPasswordResetEmail(auth, emailForPasswordReset)
        .then(() => {
          console.log('Password reset email sent successfully');
          setForgotPassword(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          closeLoginForm();
          handleLoginSuccess(); 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          setShowPasswordWarning(true);
        });
    }
  };

  return (
    <div className="login-form-overlay">
      <div className={`login-form ${isRegister ? 'register-form' : ''}`}>
        <button className="close-button" onClick={closeLoginForm}>
          X
        </button>
        {forgotPassword ? (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                setEmailForPasswordReset(email);
                handleLogin(email, '');
              }}
            >
              <label>Email: <input type="text" name="email" /></label>
              <button type="submit" className="submit-button">
                Reset Password
              </button>
            </form>
            <div className="forgot-password-links">
              <p onClick={() => setForgotPassword(false)} className="toggle-form">
                Back to login
              </p>
              <p onClick={toggleForm} className="toggle-form">
                {isRegister ? 'Back to login' : 'Create an account'}
              </p>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
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
            }}
          >
            <label>Email: <input type="text" name="email" /></label>
            {!forgotPassword && (
              <>
                <label>Password: <input type="password" name="password" /></label>
                {showPasswordWarning && <p className="warning">Incorrect password. Please try again.</p>}
                {isRegister && (
                  <label>Confirm Password: <input type="password" name="confirmPassword" /></label>
                )}
              </>
            )}
            <button type="submit" className="submit-button">
              {forgotPassword ? 'Reset Password' : (isRegister ? 'Register' : 'Login')}
            </button>
            {!forgotPassword && !isRegister && (
              <>
                <p onClick={() => setForgotPassword(true)} className="toggle-form forgot-password">
                  Forgot your password?
                </p>
                <div className="additional-links">
                  <p onClick={toggleForm} className="toggle-form">
                    Create an account
                  </p>
                </div>
              </>
            )}
            {!forgotPassword && isRegister && (
              <div className="additional-links">
                <p onClick={toggleForm} className="toggle-form">
                  Back to login
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;