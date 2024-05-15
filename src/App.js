import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Services from './components/ServicesPage/Services';

import Cart from './components/CartPage/Cart';
import Login from './components/Login/Login';
import Footer from './components/Footer/FooterF';
import Profile from './components/Profile/Profile';
import ContactUs from './components/ContactUs/ContactUs'

import NavBar from './components/NavBarPage/NavBar';
import Navigation from './components/Navigation/Nav';
import ProductDetailsPage from './components/ProductDetailsPage/ProductDetailsPage'; 

import StoreComputers from './components/ComputersStorePage/ComputersStorePage';
import StoreMonitors from './components/MonitorsStorePage/MonitorsStorePage'
import StoreMice from './components/PCMiceStorePage/PCMiceStorePage'
import OfficeStore from './components/OfficeProductsPage/StorePageFinal4'

import Wishlist from './components/Wishlist/Wishlist';
import AdminPage from './components/AdminPage/AdminPage';
import TermsOfService from './components/TermsOfService/TermsOfService';

import FAQ from './components/Footer/FAQ/FAQ'

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
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUserEmail(user.email); // Update userEmail state when user is logged in
        localStorage.setItem('userEmail', user.email); // Set userEmail in localStorage
        localStorage.setItem('isLoggedIn', 'true'); // Set login status in local storage
      } else {
        setUserEmail(null); // Clear userEmail state when user is logged out
        localStorage.removeItem('userEmail'); // Remove userEmail from localStorage
        localStorage.removeItem('isLoggedIn'); // Remove login status from local storage
      }
    }, (error) => {
      console.error('Authentication error:', error);
    });

    // Check if the user is an admin (replace this logic with your own admin detection mechanism)
    const adminEmails = ['admin1@example.com', 'admin2@example.com']; // Example admin email addresses
    if (userEmail && adminEmails.includes(userEmail)) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true'); // Store admin status in local storage
    } else {
      setIsAdmin(false);
      localStorage.removeItem('isAdmin'); // Remove admin status from local storage
    }
  
    return unsubscribe; 
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Logout successful');
        setUser(null); // Clear user state after logout
        localStorage.removeItem('userEmail'); // Remove userEmail from localStorage
        localStorage.removeItem('isLoggedIn'); // Remove login status from local storage
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <>
      <NavBar />
      {localStorage.getItem('isLoggedIn') !== 'true' ? <WarningMessage>Please log in to access all features</WarningMessage> : null}
      <Navigation handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <>
          <Route path="/store/computers" element={<StoreComputers />} />
          <Route path="/store/monitors" element={<StoreMonitors />} />
          <Route path="/store/mice" element={<StoreMice />} />
          <Route path="/store/office" element={<OfficeStore />} />
          <Route path="/product/:name" element={<ProductDetailsPage />} /> 
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/termsOfservice" element={<TermsOfService />} />
          <Route path="/FAQ" element={<FAQ />} />

          {/* Admin Route */}
          {localStorage.getItem('isAdmin') === 'true' && (
            <Route path="/admin" element={<AdminPage />} />
          )}
        </>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;