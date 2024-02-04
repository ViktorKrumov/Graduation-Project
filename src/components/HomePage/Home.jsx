import React from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import BestSeller from './BestSeller/BestSeller';
import ProductOfTheYear from './ProductOfTheYear/ProductOfTheYear'
import NewArrivals from './NewArrivals/NewArrivals';
import SpecialOffer from './SpecialOffers/SpecialOffers';

const Section = styled.section`
scroll-behavior: smooth;
  overflow-y: auto;
 background: url("https://static.vecteezy.com/system/resources/thumbnails/023/960/165/original/galaxy-and-nebula-abstract-space-background-endless-universe-with-stars-and-galaxies-in-outer-space-cosmos-art-motion-design-video.jpg");
`;



const Home = () => {
  return (
    <>
      
        <Header />
      
      
        <BestSeller />
      
      
        
        <ProductOfTheYear />

        <NewArrivals />

        <SpecialOffer />
       
    </>
  );
};

export default Home;
