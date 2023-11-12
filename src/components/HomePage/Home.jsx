import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    
    fetch('https://gist.githubusercontent.com/ViktorKrumov/f29035d526ddc0c4f74d1ac18bd9e283/raw')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        if (data && data.computers && Array.isArray(data.computers)) {
          setComputers(data.computers);
        } else {
          throw new Error('Fetched data is not in the expected format');
        }
      })
      .catch(error => {
        console.error('Error fetching or processing data:', error);
      });
  }, []);

  return (
    <div className="home-page">
      <header>
        <h1>Welcome to TechHub</h1>
        <p>Your One-Stop Shop for the Latest in Technology</p>
      </header>
      <section className="featured-products">
        <h2>Featured Computers</h2>
        {computers.map(computer => (
          <div className="product-card" key={computer.id}>
            <img src={computer.photo_url} alt={computer.name} />
            <h3>{computer.name}</h3>
            <p>Processor: {computer.processor}</p>
            <p>Memory: {computer.memory}</p>
            <p>Storage: {computer.storage}</p>
            <p>Graphics Card: {computer.graphics_card}</p>
            <p>Operating System: {computer.operating_system}</p>
            <button>Buy Now</button>
          </div>
        ))}
      </section>
      <section className="about-us">
        <h2>About Us</h2>
        <p>We are TechHub, your go-to destination for the latest tech gadgets and electronics. Our mission is to provide you with the best technology products at affordable prices.</p>
      </section>
      <section className="contact-us">
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, feel free to <a href="/contact">contact us</a>.</p>
      </section>
    </div>
  );
};

export default Home;
