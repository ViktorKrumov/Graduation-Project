import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Cart.css'; 

const Cart = ({ userEmail }) => {
  const [userProducts, setUserProducts] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  
  useEffect(() => {
    const fetchUserProducts = async () => {
      const db = getFirestore();
      const q = query(collection(db, 'Orders'), where('email', '==', userEmail));
      
      try {
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data().product,
          photo: doc.data().productPhoto,
          price: doc.data().productPrice
        }));
        setUserProducts(products);
        setIsEmpty(products.length === 0);
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    };
      
    fetchUserProducts();
  }, [userEmail]); 

  useEffect(() => {
    const totalPrice = userProducts.reduce((acc, curr) => acc + curr.price, 0);
    setFinalPrice(totalPrice);
  }, [userProducts]);

  const handleRemoveFromCart = async (productId) => {
    const db = getFirestore();
    const orderRef = doc(db, 'Orders', productId);

    try {
      await deleteDoc(orderRef);
      setUserProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      setIsEmpty(userProducts.length === 1);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  return (
    <div className="cart"> 
      <h1>Cart</h1>
      <div className="header-line">
        <span className="header-text">Product</span>
        <span className="header-text">Price</span>
      </div>
      {isEmpty ? (
        <div className="empty-cart">
          <img src="https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/Daco_5212497.png?alt=media&token=ec5d3e3d-3190-41d0-9d20-d37666df54e2" alt="Empty Cart" />
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div>
          <ul className="cart-items">
            {userProducts.map((product, index) => (
              <li className="cart-item" key={index}>
                <button className="remove-button" onClick={() => handleRemoveFromCart(product.id)}>🗑️</button>
                <div className="product-details">
                  <img className="product-image" src={product.photo} alt={product.data} />
                  <div className="product-info">
                    <span className="product-name">{product.data}</span>
                  </div>
                  <span className="product-price">${product.price}</span>
                </div>
                <br/>
              </li>
            ))}
          </ul>
          <div className="total-price">Total Price: ${finalPrice}</div>
        </div>
      )}
    </div>
  );
};

export default Cart;
