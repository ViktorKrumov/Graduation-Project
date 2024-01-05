import React, { useState, useEffect } from 'react';
import './Section1.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Section1 = () => {
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
      {/* <section className="intro-section">


      
  <header className="black-friday-header">
  <div className="header-content">
      <h1>Unbeatable Deals on Black Friday</h1>
      <p>Discover exclusive discounts and savings for a limited time!</p>
      <a href="/store" className="shop-now-button">Shop Now</a>
    </div>
   
   
  </header>
</section> */}


<div className="slider-container">
  <section className="featured-products">
    <h2>Second Slider (Reverse Direction)</h2>
    <Slider {...settings}>
      {computers.map((computer) => (
        <div className="product-card" key={computer.id}>
          <img src={computer.photo_url} alt={computer.name} />
          <h3>{computer.name}</h3>
          <p className = "stat">Processor: {computer.processor}</p>
          <p className = "stat">Memory: {computer.memory}</p>
          <p className = "stat">Storage: {computer.storage}</p>
          <p className = "stat">Graphics Card: {computer.graphics_card}</p>
          <p className = "stat">Operating System: {computer.operating_system}</p>
          
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
          <p className = "stat">Processor: {computer.processor}</p>
          <p className = "stat">Memory: {computer.memory}</p>
          <p className = "stat">Storage: {computer.storage}</p>
          <p className = "stat">Graphics Card: {computer.graphics_card}</p>
          <p className = "stat">Operating System: {computer.operating_system}</p>
          
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

       
      </div>
    </div>
  );
};

export default Section1;