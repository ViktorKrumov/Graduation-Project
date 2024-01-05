
import React, { useState, useEffect } from 'react';
import './Product.css';

const Products1 = ({ order }) => {
  const [products, setProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/ViktorKrumov/06d3bba171aed77e3b406d9acdd7c08d/raw');
        const data = await response.json();

        if (data && data.computers && Array.isArray(data.computers)) {
          setProducts(data.computers);
        } else {
          throw new Error('Fetched data is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    let sortedProducts = [...products];

    switch (order) {
      case 'price-low-to-high':
        sortedProducts.sort((a, b) => parseFloat(a.discounted_price) - parseFloat(b.discounted_price));
        break;
      case 'price-high-to-low':
        sortedProducts.sort((a, b) => parseFloat(b.discounted_price) - parseFloat(a.discounted_price));
        break;
      default:
        
        break;
    }

    setOrderedProducts(sortedProducts);
  }, [order, products]);

  return (
    <>
      

      <h1>Gaming Computers</h1>
      <div className="product-container">
        {orderedProducts.map((computer) => (
          <div className="product-card" key={computer.id}>
            <img src={computer.photo_url} alt={computer.name} />
            <h3>{computer.name}</h3>
            <p className="stat">Processor: {computer.processor}</p>
            <p className="stat">Memory: {computer.memory}</p>
            <p className="stat">Storage: {computer.storage}</p>
            <p className="stat">Graphics Card: {computer.graphics_card}</p>
            <p className="stat">Operating System: {computer.operating_system}</p>

            <p className="original-price">
              <del>{parseFloat(computer.original_price)} лв</del>
            </p>

            <p className="discounted-price">{parseFloat(computer.discounted_price)} лв</p>
            <button>Buy Now</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products1;