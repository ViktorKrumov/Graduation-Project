import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Cart.css'; 

const Cart = ({ userEmail }) => {
  const [userProducts, setUserProducts] = useState([]);
  
  useEffect(() => {
    const fetchUserProducts = async () => {
        const db = getFirestore();
        const q = query(collection(db, 'Orders'), where('email', '==', userEmail));
      
        try {
          const querySnapshot = await getDocs(q);
          const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data().product,
            photo: doc.data().productPhoto 
          }));
          setUserProducts(products);
        } catch (error) {
          console.error('Error fetching user products:', error);
        }
      };
      
    fetchUserProducts();
  }, [userEmail]); 

  const handleRemoveFromCart = async (productId) => {
    const db = getFirestore();
    const orderRef = doc(db, 'Orders', productId);

    try {
      await deleteDoc(orderRef);
      setUserProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  return (
    <div className="cart"> 
      <h1>Cart</h1>
      <ul>
        {userProducts.map((product, index) => (
          <li key={index}>
            <div>
              <img src={product.photo} alt={product.data} />
              <span>{product.data}</span>
            </div>
            <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
