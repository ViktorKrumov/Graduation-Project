import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailsPage.css';
import { fetchData as fetchApi2Data } from "../api2";
import { fetchData as fetchApi3Data } from "../api3";

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { name } = useParams();

  useEffect(() => {
    async function fetchDataAndSetProduct() {
      try {
        
        const [api2Products, api3Products] = await Promise.all([fetchApi2Data(), fetchApi3Data()]);


        const foundProduct = api2Products.find(item => item.name.toString() === name) || 
                            api3Products.find(item => item.name.toString() === name);

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
      <h2>{product.name}</h2>
      <div className="product-images">
        <img src={product.photo} alt={product.name} className="main-image" />
        <div className="additional-images">
          <div className="image-placeholder"></div>
          <div className="image-placeholder"></div>
          <div className="image-placeholder"></div>
        </div>
      </div>
      <div className="product-info">
        <p><strong>Description:</strong> {product.description}</p>
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
        <p><strong>Original Price:</strong> ${product.original_price}</p>
        <p><strong>Company:</strong> {product.company}</p>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
