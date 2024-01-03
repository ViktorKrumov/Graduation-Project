import React from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import BestSeller from './BestSeller/BestSeller';
import About from './About';

const Section = styled.section`
  margin-bottom: 100px; 
`;

const Home = () => {
  return (
    <>
      <Section>
        <Header />
      </Section>
      <Section>
        <BestSeller />
      </Section>
      <Section>
        <About />
      </Section>
    </>
  );
};

export default Home;
