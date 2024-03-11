import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailsPage.css';
import { fetchData as fetchApi2Data } from "../api2";
import { fetchData as fetchApi3Data } from "../api3";
import { fetchData as fetchApi4Data } from "../api4";
import { addToCart } from '../../firebase'; 
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

function ProductDetailsPage({ isLoggedIn, userEmail }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { name } = useParams();

  useEffect(() => {
    async function fetchDataAndSetProduct() {
      try {
        const [api2Products, api3Products, api4Products] = await Promise.all([fetchApi2Data(), fetchApi3Data(), fetchApi4Data()]);

        const foundProduct = api2Products.find(item => item.name.toString() === name) || 
                            api3Products.find(item => item.name.toString() === name) || 
                            api4Products.find(item => item.name.toString() === name);

        if (foundProduct) {
          setProduct(foundProduct);
          setLoading(false);
        } else {
          setError('Product not found');
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchDataAndSetProduct();
  }, [name]);

  const handleAddToCart = () => {
    console.log(product.name);
    console.log(userEmail);
    console.log(product.photo);
    console.log(product.original_price);
    if (isLoggedIn) {
      addToCart(userEmail, product.name, product.photo, product.original_price);
    } else {
      
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-images">
        <img src={product.photo} alt={product.name} className="main-image" />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        {product.processor && ( 
          <div>
            <p><strong>Processor:</strong> {product.processor}</p>
            <p><strong>Memory:</strong> {product.memory}</p>
            <p><strong>Storage:</strong> {product.storage}</p>
            <p><strong>Graphics Card:</strong> {product.graphics_card}</p>
            <p><strong>Operating System:</strong> {product.operating_system}</p>
          </div>
        )}
        {product.panel_type && ( 
          <div>
            <p><strong>Panel Type:</strong> {product.panel_type}</p>
            <p><strong>Refresh Rate:</strong> {product.refresh_rate}</p>
            <p><strong>Resolution:</strong> {product.resolution}</p>
            <p><strong>Screen Size:</strong> {product.screen_size}</p>
          </div>
        )}
        {product.DPI && ( 
          <div>
            <p><strong>DPI:</strong> {product.DPI}</p>
            <p><strong>Color:</strong> {product.color}</p>
            <p><strong>Connection:</strong> {product.connection}</p>
            <p><strong>Weight:</strong> {product.weight}</p>
          </div>
        )}
        <p className="Company">Company: {product.company}</p>
        <p className="price">${product.original_price}</p>
        {isLoggedIn ? (
          <div className="buttons">
            <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="add-to-wishlist">Add to Wishlist</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link> to add to cart or wishlist.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
