import React, { useState } from "react";
import styled from "styled-components";


const data = [
  { name: "Gaming tech", link: "https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Gaming-periferia-removebg.png?raw=true", buttonText: "See more Gaming Tech", buttonLink: "/web-design" },
  { name: "Office tech", link: "https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Office-removebg.png?raw=true", buttonText: "See more Office tech", buttonLink: "/development" },
  { name: "Home tech", link: "https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Home-removebg.png?raw=true", buttonText: "See more Illustration", buttonLink: "/illustration" },
  { name: "Product Design", link: "product-design-photo.jpg", buttonText: "See more Product Design", buttonLink: "/product-design" },
  { name: "Social Media", link: "social-media-photo.jpg", buttonText: "See more Social Media", buttonLink: "/social-media" },
];

const Section = styled.div`
 
  display: flex;
  justify-content: center;
  position: relative;
  color: black;
  font-size: 14px;
  font-weight: 300;
`;


const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    padding: 20px;
    justify-content: center;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.li`
  font-size: 90px;
  font-weight: bold;
  cursor: pointer;
  color: transparent;
  -webkit-text-stroke: 1px white;
  position: relative;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    color: white;
    -webkit-text-stroke: 0px;
  }

  ::after {
    content: "${(props) => props.text}";
    position: absolute;
    top: 0;
    left: 0;
    color: pink;
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover {
    ::after {
      animation: moveText 0.5s linear both;

      @keyframes moveText {
        to {
          width: 100%;
        }
      }
    }
  }
`;

const Right = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  animation: animate 2s infinite ease alternate;

    @keyframes animate {
      to {
        transform: translateY(15px);
      }
    }
`;

const SeeMoreButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #3498db;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #2980b9;
  }
`;

const BestSeller = () => {
  const [work, setWork] = useState(data[0].name);

  const handleWorkClick = (selectedWork) => {
    setWork(selectedWork);
  };

  return (
    <Section>
      <Container>
        <Left>
          <List>
            {data.map((item) => (
              <ListItem key={item.name} text={item.name} onClick={() => handleWorkClick(item.name)}>
                {item.name}
              </ListItem>
            ))}
          </List>
        </Left>
        <Right>
          {work === "Gaming tech" ? (
            <Image src={data[0].link} alt="Web Design" />
          ) : work === "Office tech" ? (
            <Image src={data[1].link} alt="Development" />
          ) : work === "Home tech" ? (
            <Image src={data[2].link} alt="Illustration" />
          ) : work === "Product Design" ? (
            <Image src={data[3].link} alt="Product Design" />
          ) : (
            <Image src={data[4].link} alt="Social Media" />
          )}
          <SeeMoreButton href={data.find(item => item.name === work)?.buttonLink || "#"}>{data.find(item => item.name === work)?.buttonText || "See more"}</SeeMoreButton>
        </Right>
      </Container>
    </Section>
    
  );
};

export default BestSeller;
