import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/trendy" component={Trendy} />
        <Route path="/store" component={Store} />
      </Switch>
      {isLoginFormVisible && <Login closeLoginForm={closeLoginForm} />}
      <Footer/>
    </>
  );
}

export default App;
