import React, { useState } from 'react';
import { BsCheckCircleFill, BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './Login.css';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from '../../firebase';

const Login = ({ handleLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailForPasswordReset, setEmailForPasswordReset] = useState('');
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userEmail, setUserEmail] = useState(null); // State to hold user's email after successful login
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setForgotPassword(false);
    setShowPasswordWarning(false);
    setSuccessMessage(''); 
    setPasswordError('');
    setEmailError('');
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setEmailError('');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters long.');
      setEmailError('');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccessMessage('You have successfully registered!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          setEmailError('Email is already in use.');
        } else {
          console.error(errorCode, errorMessage);
        }
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserEmail(user.email); 
        console.log("User email in Login component:", user.email);
        setSuccessMessage('You have successfully logged in!');
        handleLoginSuccess();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
          setShowPasswordWarning(true);
        } else {
          console.error(errorCode, errorMessage);
        }
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
          <img src='https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/SmallLogoTechnoShack.png?alt=media&token=ccbd69d5-bb5a-405c-a41f-48b76766c76a' alt="navbar-logo" className="logo" />
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
              Welcome to TechnoShack!
            </span>
            <br />
            At TechnoShack, we're committed to providing you with the best experience in tech shopping. Explore our wide range of products, from the latest gadgets to essential accessories, all at unbeatable prices. Whether you're a tech enthusiast or just getting started, we've got everything you need to stay connected and productive. Start browsing now and discover the future of technology!
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
                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </span>
                  </div>
                  {showPasswordWarning && <p className="warning">Incorrect password. Please try again.</p>}
                  {passwordError && <p className="error">{passwordError}</p>}
                  {emailError && <p className="error">{emailError}</p>}
                  {isRegister && (
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
