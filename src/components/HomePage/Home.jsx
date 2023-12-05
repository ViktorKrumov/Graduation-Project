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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 792,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const reverseSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: true, 
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 792,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
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
    <div>
      <div className="home-page">
      <section className="intro-section">


      <div className="brands">
    <div>
      <img src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Cyber-week.png?raw=true" />
    </div>
    <div>
      <img src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Nvidia.jpg?raw=true" />
    </div>
    <div>
      <img src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/pngegg.png?raw=true" />
    </div>
    <div>
      <img src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Cyber-week.png?raw=true" />
    </div>
    <div>
      <img src="https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Cyber-week.png?raw=true" />
    </div>
  </div>
  
  <header className="black-friday-header">
  <div className="header-content">
      <h1>Unbeatable Deals on Black Friday</h1>
      <p>Discover exclusive discounts and savings for a limited time!</p>
      <a href="/store" className="shop-now-button">Shop Now</a>
    </div>
   
   
  </header>
</section>


<div className="slider-container">
  <section className="featured-products">
    <h2>Second Slider (Reverse Direction)</h2>
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
          
          <p className="original-price">
            <del>{computer.original_price} лв</del>
          </p>
          
          <p className="discounted-price">{computer.discounted_price} лв</p>
          <button>Buy Now</button>
        </div>
      ))}
    </Slider>
  </section>
</div>

        <div className="slider-container">
  <section className="featured-products">
    <h2>Second Slider (Reverse Direction)</h2>
    <Slider {...reverseSettings}>
      {computers.map((computer) => (
        <div className="product-card" key={computer.id}>
          <img src={computer.photo_url} alt={computer.name} />
          <h3>{computer.name}</h3>
          <p>Processor: {computer.processor}</p>
          <p>Memory: {computer.memory}</p>
          <p>Storage: {computer.storage}</p>
          <p>Graphics Card: {computer.graphics_card}</p>
          <p>Operating System: {computer.operating_system}</p>
          
          <p className="original-price">
            <del>{computer.original_price} лв</del>
          </p>
          
          <p className="discounted-price">{computer.discounted_price} лв</p>
          <button>Buy Now</button>
        </div>
      ))}
    </Slider>
  </section>
</div>

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
    </div>
  );
};

export default Home;
