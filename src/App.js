import React from "react";
import { Switch, Route} from "react-router-dom"
import Home from './components/HomePage/Home'
import About from './components/AboutPage/About'
import NavBar from './components/NavBarPage/NavBar';

const App = ()=> {
  return (
    <>
    <NavBar/>
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
    </Switch>
    </>
    
    
  )
}

export default App
