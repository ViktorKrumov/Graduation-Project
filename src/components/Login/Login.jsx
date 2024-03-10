import React, { useState } from 'react';
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './Login.css';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from '../../firebase';

const Login = ({ handleLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailForPasswordReset, setEmailForPasswordReset] = useState('');
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userEmail, setUserEmail] = useState(null); // State to hold user's email after successful login

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setForgotPassword(false);
    setShowPasswordWarning(false);
    setSuccessMessage(''); 
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccessMessage('You have successfully registered!');
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
        setUserEmail(user.email); // Set the userEmail state with the user's email
        console.log("User email in Login component:", user.email);
        setSuccessMessage('You have successfully logged in!');
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
    <div className="login-page-container">
      <div className="left-content">
        <Link to="/">
          <img src = 'https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/SmallLogoTechnoShack.png?alt=media&token=ccbd69d5-bb5a-405c-a41f-48b76766c76a' alt="navbar-logo" className="logo" />
        </Link>
        <div className="flex flex-col gap-1 -mt-1">
          <h1 className="font-titleFont text-xl font-medium">
            Stay sign in for more
          </h1>
          <p className="text-base">When you sign in, you are with us!</p>
        </div>
        <div className="w-[300px] flex items-start gap-3">
          <span className="text-green-500 mt-1">
            <BsCheckCircleFill />
          </span>
          <p className="text-base text-gray-300">
            <span className="text-white font-semibold font-titleFont">
              Get started fast with TechnoShack
            </span>
            <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
            nisi dolor recusandae consectetur!
          </p>
        </div>
      </div>
      <div className="right-content">
        <div className="login-form">
          {successMessage ? (
            <div>
              <p>{successMessage}</p>
              {userEmail && <p>Your email: {userEmail}</p>} 
              <Link to="/">Go to Home Page</Link>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
