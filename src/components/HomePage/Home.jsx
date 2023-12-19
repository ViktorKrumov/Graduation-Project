import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from './Header/Header';
import BestSeller from './BestSeller/BestSeller';
import About from './About'


const Home =() => {
  

  return(
      <>
      
      <Header/>
      <BestSeller/>
      <About/>
      </>
  )

}
export default Home
