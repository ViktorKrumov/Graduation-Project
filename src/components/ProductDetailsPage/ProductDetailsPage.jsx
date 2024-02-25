import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailsPage.css'; 

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  
  
  const { id } = useParams();

  useEffect(() => {
    
    fetch(`https://gist.githubusercontent.com/ViktorKrumov/f29035d526ddc0c4f74d1ac18bd9e283/raw`)
      .then(response => response.json())
      .then(data => {
        const productDetails = data.computers.find(item => item.id.toString() === id);
        if (productDetails) {
          setProduct(productDetails);
        } else {
          setError('Product not found');
        }
      })
      .catch(error => setError(error.message));
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
    <h2>{product.name}</h2>
    <div className="product-images">
    <img src={product.photo_url} alt={product.name} className="main-image" />
    <div className="additional-images">
      <div className="image-placeholder"></div>
      <div className="image-placeholder"></div>
      <div className="image-placeholder"></div>
    </div>
  </div>
    <div className="product-info">
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Processor:</strong> {product.processor}</p>
      <p><strong>Memory:</strong> {product.memory}</p>
      <p><strong>Storage:</strong> {product.storage}</p>
      <p><strong>Graphics Card:</strong> {product.graphics_card}</p>
      <p><strong>Operating System:</strong> {product.operating_system}</p>
      <p><strong>Original Price:</strong> ${product.original_price}</p>
      <p><strong>Discounted Price:</strong> ${product.discounted_price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Color:</strong> {product.color}</p>
      <p><strong>Company:</strong> {product.company}</p>
    </div>
  </div>
  );
}

export default ProductDetailsPage;
