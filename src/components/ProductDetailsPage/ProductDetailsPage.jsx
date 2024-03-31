import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailsPage.css';
import { fetchData as fetchApi2Data } from "../api2";
import { fetchData as fetchApi3Data } from "../api3";
import { fetchData as fetchApi4Data } from "../api4";
import { addToCart, addToWishlist } from '../../firebase'; 
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai';

import { getFirestore, collection, query, where, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";

function ProductDetailsPage({ isLoggedIn, userEmail, onAddToCart }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userProducts, setUserProducts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);




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

  useEffect(() => {
    const fetchUserProducts = async () => {
      const db = getFirestore();
      const q = query(collection(db, "Cart"), where("email", "==", userEmail));

      try {
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data().product,
            photo: doc.data().productPhoto,
            price: doc.data().productPrice,
            quantity: doc.data().quantity,
          }));
          setUserProducts(products);
          setIsEmpty(products.length === 0);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserProducts();
    }
  }, [isLoggedIn, userEmail]);

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);

    if (isLoggedIn) {
      const existingProduct = userProducts.find((item) => item.data === product.name);
      if (existingProduct) {
        const newQuantity = existingProduct.quantity + 1;
        handleQuantityChange(existingProduct.id, newQuantity);
      } else {
        addToCart(userEmail, product.name, product.photo, product.original_price, 1);
      }
    } else {
      onAddToCart();
    }

    setIsAddingToCart(false);
  };

  
  const handleQuantityChange = async (productId, newQuantity) => {
    const db = getFirestore();
    const orderRef = doc(db, 'Cart', productId);

    try {
      await updateDoc(orderRef, { quantity: newQuantity });
      setUserProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId ? { ...product, quantity: newQuantity } : product
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleAddToWishlist = () => {
    if (isLoggedIn) {
      addToWishlist(userEmail, product.name, product.photo, product.original_price);
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
            <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart<AiOutlineShoppingCart className="wishlist-icon" /></button>
            <button className="add-to-wishlist" onClick={handleAddToWishlist}>Add to Wishlist<FiHeart className="wishlist-icon" /></button>
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
