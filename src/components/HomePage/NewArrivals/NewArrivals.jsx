import React, { useState, useEffect } from 'react';
import './NewArrivals.css';
import Slider from 'react-slick';
import { SlActionRedo } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";

const NewArrivals = () => {
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
        <div className="slider-container">
          <section className="featured-products">
            <h2 className="new-arrivals-title">New Arrivals</h2>
            <Slider {...settings}>
              {computers.map((computer) => (
                <div className="product-card" key={computer.id}>
                  <img src={computer.photo_url} alt={computer.name} />
                  <h3>{computer.name}</h3>
                  <div className="dropdown-menu">
                    <div className="dropdown-menu-item">Add to cart 🛒</div>
                    <div className="dropdown-menu-item">View Details <SlActionRedo /></div>
                    <div className="dropdown-menu-item">Add to wishlist <FaHeart /></div>
                  </div>
                  <p className="original-price">
                    {computer.original_price} лв
                  </p>
                
                </div>
              ))}
            </Slider>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
