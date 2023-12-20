import React from 'react';
import styled from 'styled-components';

const Header = () => {
  const Section = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    margin-top: 20px;
    

    @media only screen and (max-width: 768px) {
      flex-direction: row;
      margin-top: 60px;
     
    }

    @media only screen and (max-height: 400px) {
      margin-top: 370px;
    }

    @media only screen and (max-height: 390px) {
      margin-top: 170px;
    }

    @media only screen and (max-height: 360px) {
      margin-top: 270px;
    }
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media only screen and (min-width: 768px) {
      flex-direction: row;
      max-width: 1200px;
      margin: 0 auto;
    }
  `;

  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    width: 100%;

    @media only screen and (min-width: 768px) {
      width: auto;
    }
  `;

  const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    font-family: 'Pacifico', cursive;

    @media only screen and (min-width: 768px) {
      font-size: 36px;
    }
  `;

  const WhatWeDo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `;

  const Line = styled.img`
    height: 3px;
  `;

  const Subtitle = styled.h2`
    color: #da4ea2;
    font-size: 20px;
    font-weight: bold;
    font-family: 'Quicksand', sans-serif;
  `;

  const Desc = styled.p`
    font-size: 16px;
    line-height: 1.5;
    font-family: 'Open Sans', sans-serif; 
    @media only screen and (min-width: 768px) {
      font-size: 18px;
    }
  `;

  const Button = styled.button`
    background-color: #da4ea2;
    color: white;
    font-weight: 600;
    width: 120px;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-family: 'Roboto', sans-serif; 
  `;

  const MoreButton = styled.button`
    background-color: #35a5e5;
    color: white;
    font-weight: 600;
    width: 150px;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  `;

  const Icon = styled.i`
    font-size: 24px;
    color: #da4ea2;
  `;

  const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    @media only screen and (min-width: 768px) {
      margin-top: 0;
      margin-left: 20px;
    }
  `;

  const Img = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    animation: animate 2s infinite ease alternate;

    @keyframes animate {
      to {
        transform: translateY(10px);
      }
    }

    @media only screen and (min-width: 768px) {
      width: 80%;
    }
  `;

  return (
    <>
      <Section>
        <Container>
          <Left>
            <Title>Think. Make. Solve.</Title>
            <WhatWeDo>
              <Line src="https://via.placeholder.com/30x3" alt="line" />
              <Subtitle>What we Do</Subtitle>
            </WhatWeDo>
            <Desc>
              We enjoy creating delightful, human-centered digital experiences. Our team is
              passionate about pushing boundaries and delivering innovative solutions.
            </Desc>
            <Button>Learn More</Button>
            <MoreButton>
              <Icon className="fas fa-arrow-right" /> Explore Now
            </MoreButton>
          </Left>
          <Right>
            <Img
              src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc2.png?raw=true"
              alt="Inspiring Computer Image"
            />
          </Right>
        </Container>
      </Section>
    </>
  );
};

export default Header;
