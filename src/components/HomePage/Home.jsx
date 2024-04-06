import React from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import BestSeller from './BestSeller/BestSeller';
import ProductOfTheYear from './ProductOfTheYear/ProductOfTheYear'
import ProductOfTheYearMonitor from './ProductOfTheYear/ProductOfTheYearMonitor'
import NewArrivals from './NewArrivals/NewArrivals';
import SpecialOffer from './SpecialOffers/SpecialOffers';



const Home = ({isLoggedIn, userEmail}) => {
  return (
    <>
      
        <Header />
       
        <BestSeller />
        
        <ProductOfTheYear />

        <NewArrivals isLoggedIn={isLoggedIn} userEmail={userEmail}/>

        <SpecialOffer />

        <ProductOfTheYearMonitor />
       
    </>
  );
};

export default Home;
