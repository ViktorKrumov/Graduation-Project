import React from 'react';
import styled from 'styled-components';

const BestSeller = () => {
  const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin-top : 200px;
  `;

  const Title = styled.h2`
    font-size: 36px; 
    margin-bottom: 20px;
    background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fad0c4);
    -webkit-background-clip: text;
    color: transparent;
  `;

  const ImageContainer = styled.div`
    display: grid;
    max-width: 900px;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 20px;

    @media only screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `;

  const Image = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    animation: animate 2s infinite ease alternate;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1); 
    }

    @keyframes animate {
      to {
        transform: translateY(10px);
      }
    }
  `;

  return (
    <Section>
      <Title>Best Sellers</Title>
      <ImageContainer>
        <Image
          src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Home-tech.png?raw=true"
          alt="Image 1"
        />
        <Image
          src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Gaming-tech.png?raw=true"
          alt="Image 2"
        />
        <Image
          src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Office-tech.png?raw=true"
          alt="Image 3"
        />
        <Image
          src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Lab-tech.png?raw=true"
          alt="Image 4"
        />
      </ImageContainer>
    </Section>
  );
};

export default BestSeller;
