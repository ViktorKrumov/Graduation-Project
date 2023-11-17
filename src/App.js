import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Trendy from './components/TrendyPage/Trendy';
import Store from './components/StorePage/Store';
import NavBar from './components/NavBarPage/NavBar';
import Login from './components/Login/Login';
import Footer from './components/Footer/FooterF';
// import Profile from './components/Profile/Profile';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const closeLoginForm = () => {
    setIsLoginFormVisible(false);
  };

  const handleLogin = () => {
  
    setIsLoggedIn(true);
    closeLoginForm();
  };

  const handleLogout = () => {
    
    setIsLoggedIn(false);
  };

  return (
    <>
      <NavBar
        toggleLoginForm={toggleLoginForm}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/trendy" element={<Trendy />} />
        <Route path="/store" element={<Store />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
      {isLoginFormVisible && <Login closeLoginForm={closeLoginForm} handleLogin={handleLogin} />}
      <Footer />
    </>
  );
};

export default App;
