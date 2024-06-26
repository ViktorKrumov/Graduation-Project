import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc, addDoc, updateDoc, increment } from 'firebase/firestore';
import './Cart.css';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { toast } from 'react-toastify';
import { addToOrders } from '../../firebase';

const Cart = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchUserProducts = async () => {
      const db = getFirestore();
      const q = query(collection(db, 'Cart'), where('email', '==', userEmail));

      try {
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data().product,
          photo: doc.data().productPhoto,
          price: doc.data().productPrice,
          quantity: doc.data().quantity 
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
    const totalPrice = userProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0); 
    setFinalPrice(totalPrice);
  }, [userProducts]);

  const handleRemoveFromCart = async (productId) => {
    const db = getFirestore();
    const orderRef = doc(db, 'Cart', productId);
  
    try {
      await deleteDoc(orderRef);
      setUserProducts(prevProducts => {
        const updatedProducts = prevProducts.filter(product => product.id !== productId);
        setIsEmpty(updatedProducts.length === 0);
        return updatedProducts;
      });
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
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

  const handleSubmitForm = async (formData) => {
    const { fullName, email, address, city, zipcode } = formData;
    const items = userProducts.map(product => ({
      productName: product.data,
      productPhoto: product.photo,
      productPrice: product.price,
      quantity: product.quantity 
    }));
    try {
      await addToOrders(fullName, email, address, city, zipcode, items);
      console.log('Order placed successfully!');
      //toast.success('Order placed successfully!');
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const clearCart = async () => {
    const db = getFirestore();
    const q = query(collection(db, 'Cart'), where('email', '==', userEmail));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async doc => {
        await deleteDoc(doc.ref);
      });
      setUserProducts([]);
      setIsEmpty(true);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <div className="cart">
      <h1>Cart</h1>
      <div className="header-line">
        <span className="header-text">Product</span>
        <span className="header-text">Price</span>
        <span className="header-text">Quantity</span>
      </div>
      {isEmpty ? (
        <div className="empty-cart">
           <img src="https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/Daco_5212497.png?alt=media&token=ec5d3e3d-3190-41d0-9d20-d37666df54e2" alt="Empty Cart" />
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
                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)} disabled={product.quantity <= 1}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>+</button>
                </div>
                <br />
              </li>
            ))}
          </ul>
          <div className="total-price">Total Price: ${finalPrice.toFixed(2)}</div>
          <button className="proceed-to-checkout-button" onClick={() => setIsCheckoutOpen(true)}>Proceed to Checkout</button>
          {isCheckoutOpen && <CheckoutForm onSubmit={handleSubmitForm} />}
        </div>
      )}
    </div>
  );
};

export default Cart;
