import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Trendy from './components/TrendyPage/Trendy';
import Store from './components/StorePage/Store';
import Store2 from './components/SorePageAlt/StoreAlt';
import Cart from './components/CartPage/Cart'
import Login from './components/Login/LoginPage';
import Footer from './components/Footer/FooterF';
import Profile from './components/Profile/Profile';
import LogoutConfirmation from './components/Profile/LogoutConfirmation';
import NavBar from './components/NavBarPage/NavBar';
import Navigation from './components/Navigation/Nav'
import { getAuth } from 'firebase/auth';
import styled from "styled-components";

const App = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const location = useLocation();

  useEffect(() => {
 
    if (location.pathname === '/login') {
    
      setShowNavBar(false);
      setShowNavigation(false);
      setShowFooter(false);
    } else {
      
      setShowNavBar(true);
      setShowNavigation(true);
      setShowFooter(true);
    }
  }, [location]);

  return (
    <>
      {showNavBar && <NavBar />}
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/store" element={<Store2 />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

export default App;
