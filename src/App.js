import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Trendy from './components/TrendyPage/Trendy';
import Store from './components/StorePage/Store';
import NavBar from './components/NavBarPage/NavBar';
import Login from './components/Login/Login';
import Footer from './components/Footer/FooterF';



const App = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const closeLoginForm = () => {
    setIsLoginFormVisible(false);
  };

  return (
    <>
      <NavBar toggleLoginForm={toggleLoginForm} />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/trendy" element={<Trendy/>} />
        <Route path="/store" element={<Store/>} />
      </Routes>
      {isLoginFormVisible && <Login closeLoginForm={closeLoginForm} />}
      <Footer/>
    </>
  );
}

export default App;
