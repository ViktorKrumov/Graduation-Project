import React from 'react';
import './Header.css';

const Header = () => (
  <div className="technoshack-header section-padding" id="home">
    <div className="technoshack-header-content">
      <h1 className="gradient-text">Explore Cutting-Edge Tech at TechnoShack</h1>
      <p>Your go-to destination for high-quality tech parts, PC components, and more. Discover a world of innovation and build your dream setup with TechnoShack. Unleash the power of technology with our premium selection and expert guidance.</p>

      <div className="technoshack-header-content-input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>
    </div>

    <div className="technoshack-header-image">
      <img src="https://raw.githubusercontent.com/ViktorKrumov/Images-Graduation-Project/main/BackgroundAI.png" alt="Descriptive Alt Text" />
    </div>
  </div>
);

export default Header;
