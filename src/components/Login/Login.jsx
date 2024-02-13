import React, { useState } from 'react';
import './Login.css';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from '../../firebase';

const Login = ({ handleLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailForPasswordReset, setEmailForPasswordReset] = useState('');
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setForgotPassword(false);
    setShowPasswordWarning(false);
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        handleLoginSuccess();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        handleLoginSuccess();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        setShowPasswordWarning(true);
      });
  };

  const handleResetPassword = () => {
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
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        {forgotPassword ? (
          <>
            <input
              type="text"
              placeholder="Enter your email"
              value={emailForPasswordReset}
              onChange={(e) => setEmailForPasswordReset(e.target.value)}
            />
            <button onClick={handleResetPassword}>Reset Password</button>
            <p onClick={() => setForgotPassword(false)}>Back to login</p>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPasswordWarning && <p className="warning">Incorrect password. Please try again.</p>}
            {isRegister && (
              <input
                type="password"
                placeholder="Confirm your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
            <button onClick={isRegister ? handleRegister : handleLogin}>{isRegister ? 'Register' : 'Login'}</button>
            <p onClick={() => setForgotPassword(true)}>Forgot your password?</p>
            <p onClick={toggleForm}>{isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
