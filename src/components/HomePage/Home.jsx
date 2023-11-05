import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header>
        <h1>Welcome to TechHub</h1>
        <p>Your One-Stop Shop for the Latest in Technology</p>
      </header>
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-card">
          <img src="product1.jpg" alt="Product 1" />
          <h3>Smartphone XYZ</h3>
          <p>The latest smartphone with amazing features.</p>
          <button>Buy Now</button>
        </div>
        <div className="product-card">
          <img src="product2.jpg" alt="Product 2" />
          <h3>Laptop ABC</h3>
          <p>Powerful and stylish laptop for your needs.</p>
          <button>Buy Now</button>
        </div>
        <div className="product-card">
          <img src="product3.jpg" alt="Product 3" />
          <h3>Smart Watch 123</h3>
          <p>Stay connected with this smartwatch.</p>
          <button>Buy Now</button>
        </div>
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
