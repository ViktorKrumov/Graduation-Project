import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/HomePage/Home';
import About from './components/AboutPage/About';
import NavBar from './components/NavBarPage/NavBar';
import Login from './components/Login/Login';

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
        <Route path="/about" component={About} />
      </Switch>
      {isLoginFormVisible && <Login closeLoginForm={closeLoginForm} />}
    </>
  );
}

export default App;
