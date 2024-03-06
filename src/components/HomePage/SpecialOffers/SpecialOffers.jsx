

import React from 'react';
import './SpecialOffers.css';
import { SlActionRedo } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";

const SpecialOffer = () => {

  const products = [
    { id: 1, image: 'https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc4.png?raw=true', name: 'Product 1', original_price: 100, isNew: true },
    { id: 2, image: 'https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc3.png?raw=true', name: 'Product 2', original_price: 120 },
    { id: 3, image: 'https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc2.png?raw=true', name: 'Product 3', original_price: 90, isNew: true },
    { id: 4, image: 'https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc5.png?raw=true', name: 'Product 4', original_price: 80 },
  ];

  return (
    <div className="slider-container2">
      <section className="featured-products">
        <h2 className="new-arrivals-title">Special Offers</h2>
        <div className="product-cards-container">
          {products.map((product) => (
            <div className="product-card2" key={product.id}>
              <div className="dropdown-container">
                <img src={product.image} alt={product.name} />
                <div className="dropdown-menu">
                  <div className="dropdown-menu-item">Add to card 🛒</div>
                  <div className="dropdown-menu-item">View Details <SlActionRedo /></div>
                  <div className="dropdown-menu-item">Add to wishlist <FaHeart /></div>
                </div>
                <h3>{product.name}</h3>
                <p className="original-price">${product.original_price} </p>
                
            
                
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SpecialOffer;
