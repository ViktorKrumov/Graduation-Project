import React from 'react';
import styled from 'styled-components';

const BestSeller = () => {
  const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin-top: 100px;

    @media only screen and (max-width: 768px) {
      margin-top: 690px;
    }

    @media only screen and (max-width: 600px) {
      margin-top: 450px;
    }

    @media only screen and (max-width: 576px) {
      margin-top: 550px;
    }

    @media only screen and (max-width: 506px) {
      margin-top: 470px;
    }

    @media only screen and (max-height: 430px) {
      margin-top: 370px;
    }

    @media only screen and (max-height: 400px) {
      margin-top: 570px;
    }

    @media only screen and (max-height: 376px) {
      margin-top: 270px;
    }
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
    margin-top: 10px;

    @media only screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media only screen and (max-width: 768px) {
      max-width: 50%;
    }

    @media only screen and (max-width: 576px) {
      max-width: 60%;
    }

    @media only screen and (max-height: 430px) {
      max-width: 60%;
    }

   
  `;

  const Image = styled.img`
    max-width: 100%;
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

  const ImageText = styled.p`
    text-align: center;
    margin-top: 10px;
  `;

  return (
    <Section>
      <Title>Best Sellers</Title>
      <ImageContainer>
        <div>
          <Image
            src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Home-tech.png?raw=true"
            alt="Image 1"
          />
          <ImageText>Text for Image 1</ImageText>
        </div>
        <div>
          <Image
            src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Gaming-tech.png?raw=true"
            alt="Image 2"
          />
          <ImageText>Text for Image 2</ImageText>
        </div>
        <div>
          <Image
            src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Office-tech.png?raw=true"
            alt="Image 3"
          />
          <ImageText>Text for Image 3</ImageText>
        </div>
        <div>
          <Image
            src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Lab-tech.png?raw=true"
            alt="Image 4"
          />
          <ImageText>Text for Image 4</ImageText>
        </div>
      </ImageContainer>
    </Section>
  );
};

export default BestSeller;
