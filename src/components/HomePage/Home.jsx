import React from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import BestSeller from './BestSeller/BestSeller';
import About from './About';

const Section = styled.section`
scroll-behavior: smooth;
  overflow-y: auto;
 background: url("https://static.vecteezy.com/system/resources/thumbnails/023/960/165/original/galaxy-and-nebula-abstract-space-background-endless-universe-with-stars-and-galaxies-in-outer-space-cosmos-art-motion-design-video.jpg");
`;



const Home = () => {
  return (
    <>
      <Section>
        <Header />
      
      
        <BestSeller />
      
      
        <About />
      </Section>
    </>
  );
};

export default Home;
