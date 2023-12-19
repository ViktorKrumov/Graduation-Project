import React from 'react';
import styled from 'styled-components';

const About = () => {
  const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    
  `;

  const Title = styled.h2`
    font-size: 36px;
    margin-bottom: 20px;
    background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fad0c4);
    -webkit-background-clip: text;
    color: transparent;
  `;

  const Content = styled.div`
    max-width: 600px;
    text-align: center;
    margin-top: 20px;
  `;

  return (
    <Section>
      <Title>About Us</Title>
      <Content>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Content>
    </Section>
  );
};

export default About;
