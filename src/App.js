import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Trendy from './components/TrendyPage/Trendy';
import Store from './components/StorePage/Store';
import NavBar from './components/NavBarPage/NavBar';
import Login from './components/Login/Login';
import Footer from './components/Footer/FooterF';
import Profile from './components/Profile/Profile';
import LogoutConfirmation from './components/Profile/LogoutConfirmation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        setIsLoggedIn(false);
        
        localStorage.removeItem('isLoggedIn');
      }
    });

   
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const closeLoginForm = () => {
    setIsLoginFormVisible(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginFormVisible(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = (confirmed) => {
    if (confirmed) {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      signOut(auth); 
      navigate('/');
    }
    setShowLogoutConfirmation(false);
  };

  const closeModal = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <>
      <NavBar toggleLoginForm={toggleLoginForm} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trendy" element={<Trendy />} />
        <Route path="/store" element={<Store />} />
        <Route
          path="/profile"
          element={<Profile isLoggedIn={isLoggedIn} handleLogout={handleLogout} toggleLoginForm={toggleLoginForm} />}
        />
      </Routes>
      {isLoginFormVisible && <Login closeLoginForm={closeLoginForm} handleLoginSuccess={handleLoginSuccess} />}
      {showLogoutConfirmation && <LogoutConfirmation confirmLogout={confirmLogout} closeModal={closeModal} />}
      <Footer />
    </>
  );
};

export default App;
