import React from 'react';
import './SpecialOffers.css';
import { SlActionRedo } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const SpecialOffer = () => {

  const products = [
    { id: 1, image: 'https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/monitor9.jpg?alt=media&token=fed01f17-3c62-4bad-a296-fc88cb23a548', name: 'Acer Predator X45bmiiphuzx', original_price: 100, isNew: true },
    { id: 2, image: 'https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/pc12.png?raw=true', name: 'Creative Workstation', original_price: 120 },
    { id: 3, image: 'https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/mouse13.jpg?alt=media&token=2098be93-c6d7-42f8-9555-adb2e735b4c1', name: 'Razer DeathAdder V3 Pro, бяла', original_price: 90, isNew: true },
    { id: 4, image: 'https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc5.png?raw=true', name: 'High-Performance Laptop', original_price: 80 },
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
                <h3>{product.name}</h3>
                <p className="original-price">${product.original_price} </p>
                <Link to={`/product/${product.name}`}>
                  <button className="view-details-button">View Details <SlActionRedo /></button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SpecialOffer;
