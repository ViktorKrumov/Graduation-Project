import React, { useState, useEffect } from 'react';
import './Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const [computers, setComputers] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 photos by default
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the autoplay speed as needed
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3, // Show 3 photos on larger screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3, // Adjust the number of slides at this breakpoint
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2, // Adjust the number of slides at this breakpoint
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2, // Show 2 photos on medium screens
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 792,
        settings: {
          slidesToShow: 1, // Show 2 photos on medium screens
          slidesToScroll: 1,
        },
      },
      
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1, // Maintain 1 photo on extra small screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Maintain 1 photo on phone screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/ViktorKrumov/f29035d526ddc0c4f74d1ac18bd9e283/raw')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.computers && Array.isArray(data.computers)) {
          setComputers(data.computers);
        } else {
          throw new Error('Fetched data is not in the expected format');
        }
      })
      .catch((error) => {
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
        <Slider {...settings}>
          {computers.map((computer) => (
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
        </Slider>
      </section>
      <section className="about-us">
        <h2>About Us</h2>
        <p>
          We are TechHub, your go-to destination for the latest tech gadgets and electronics. Our
          mission is to provide you with the best technology products at affordable prices.
        </p>
      </section>
      <section className="contact-us">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need assistance, feel free to{' '}
          <a href="/contact">contact us</a>.
        </p>
      </section>
    </div>
  );
};

export default Home;
