import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { addToCart } from '../../firebase'; 
import './Wishlist.css'; 

const Wishlist = ({ userEmail, isLoggedIn }) => {
  const [userProducts, setUserProducts] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  
  useEffect(() => {
    const fetchUserProducts = async () => {
      const db = getFirestore();
      const q = query(collection(db, 'Wishlist'), where('email', '==', userEmail));
      
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
    const orderRef = doc(db, 'Wishlist', productId); 

    try {
      await deleteDoc(orderRef);
      setUserProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      setIsEmpty(userProducts.length === 1);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const handleAddToCart = async (product) => {
    if (isLoggedIn) {
      try {
       
        await addToCart(userEmail, product.data, product.photo, product.price);
  
        
        const db = getFirestore();
        const orderRef = doc(db, 'Wishlist', product.id);
        await deleteDoc(orderRef);
  
        
        setUserProducts(prevProducts => prevProducts.filter(p => p.id !== product.id));
        setIsEmpty(userProducts.length === 1); 
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    } else {
      
    }
  };
  

  return (
    <div className="wishlist"> 
      <img src="https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/TransHeart.png?alt=media&token=7166a8a5-7041-406f-8923-8074b6ca4174" alt="Heart" className="wishlist-heart" />
      <h1>My Wishlist</h1>
      <div className="wishlist-header-line">
        <span className="wishlist-header-text">Product</span>
        <span className="wishlist-header-text">Price</span>
        <span className="wishlist-header-text">Action</span> 
      </div>
      {isEmpty ? (
        <div className="empty-wishlist">
          <img src="https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/WishlistEmpty.png?alt=media&token=47e58be1-dc1f-4f69-b668-d0d5b83a9310" alt="Empty Wishlist" />
          {/* <p>Your wishlist is empty.</p> */}
        </div>
      ) : (
        <div>
          <ul className="wishlist-items">
            {userProducts.map((product, index) => (
              <li className="wishlist-item" key={index}>
                <button className="remove-button" onClick={() => handleRemoveFromCart(product.id)}>🗑️</button>
                <div className="wishlist-product-details">
                  <img className="wishlist-product-image" src={product.photo} alt={product.data} />
                  <div className="wishlist-product-info">
                    <span className="wishlist-product-name">{product.data}</span>
                  </div>
                  <span className="wishlist-product-price">${product.price}</span>
                </div>
                <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button> 
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
