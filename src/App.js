import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Services from './components/ServicesPage/Services';
import Store from './components/StorePage/Store';
import Store2 from './components/SorePageAlt/StoreAlt';
import Store3 from './components/StorePageFinal/StorePageFinal';
import Cart from './components/CartPage/Cart';
import Login from './components/Login/Login';
import Footer from './components/Footer/FooterF';
import Profile from './components/Profile/Profile';
import LogoutConfirmation from './components/Profile/LogoutConfirmation';
import NavBar from './components/NavBarPage/NavBar';
import Navigation from './components/Navigation/Nav';
import ProductDetailsPage from './components/ProductDetailsPage/ProductDetailsPage'; 
import Register from './components/RegisterPage/RegisterPage'
import Store4 from './components/StorePageFinal 2/StorePageFinal2'
import Store5 from './components/StorePageFinal 3/StorePageFinal3'

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import styled from "styled-components";

const WarningMessage = styled.div`
  background-color: red;
  color: white;
  padding: 10px;
  text-align: center;
`;

const App = () => {
  const [userEmail, setUserEmail] = useState(null); // State to hold user's email after successful login
  const [user, setUser] = useState(null); // State to hold user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUserEmail(user.email); // Update userEmail state when user is logged in
        setIsLoggedIn(true); // Update login status
      } else {
        setUserEmail(null); // Clear userEmail state when user is logged out
        setIsLoggedIn(false); // Update login status
      }
    });

    return () => unsubscribe();
  }, []);


  const handleLoginSuccess = () => {
    console.log('Login successful');
    setIsLoggedIn(true); 
  };

  // Function to handle logout
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Logout successful');
        setUser(null); // Clear user state after logout
        setIsLoggedIn(false); 
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <>
     
      <NavBar /> 
      {user ? null : <WarningMessage>Please log in to access all features</WarningMessage>}
      <Navigation isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
       
          <>
            <Route path="/store/pc" element={<Store3 isLoggedIn={isLoggedIn} />} />
            <Route path="/store/monitors" element={<Store4 />} />
            <Route path="/store/mice" element={<Store5 />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} /> 
            <Route path="/cart" element={<Cart />} />
            <Route path="/services" element={<Services />} />
            <Route path="/profile" element={<Profile handleLogout={handleLogout} userEmail={userEmail} />} />

          </>
     
      </Routes>
      <Footer />
    </>
  );
};

export default App;
