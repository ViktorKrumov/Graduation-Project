import React, { useState, useEffect } from "react";
import { SlActionRedo } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { addToCart, addToWishlist } from "../../firebase";
import { remove, ref } from "firebase/database";
import { getDatabase, set } from "firebase/database";

import EditProductForm from "./EditProductFrom"; // Corrected the import name
import "./DropdownMenu.css";

function DropdownMenu({ isLoggedIn, onAddToCart, onAddToWishlist, product, userEmail, onEdit }) {
  const [userProducts, setUserProducts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [isFormOpen, setIsFormOpen] = useState(false);

  
  const handleDeleteProduct = async () => {
    const db = getDatabase();
    const productRef = ref(db, `computers/${product.id - 1}`);

    try {
      setIsDeleting(true);
      await remove(productRef);
      console.log("Product deleted successfully!", product.id);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditProduct = () => {
    if (onEdit) {
      onEdit(); // Invoke the onEdit function passed from the ProductCard component
    }
  };

  
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

  const handleAddToWishlist = () => {
    if (isLoggedIn) {
      addToWishlist(userEmail, product.name, product.photo, product.original_price);
    } else {
      onAddToWishlist();
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

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="dropdown-menu">
      {isLoggedIn && (
        <div className="dropdown-menu-item" onClick={handleAddToCart}>
          Add to cart 🛒
        </div>
      )}

      <Link to={`/product/${product.name}`}>
        <div className="dropdown-menu-item">
          View Details <SlActionRedo />
        </div>
      </Link>

      {isLoggedIn && (
        <div className="dropdown-menu-item" onClick={handleAddToWishlist}>
          Add to wishlist <FaHeart />
        </div>
      )}

      {isLoggedIn && isAdmin && (
        <div className="dropdown-menu-item" onClick={handleDeleteProduct}>
          Delete ❌
        </div>
      )}

      {isLoggedIn && isAdmin && (
        <div className="dropdown-menu-item" onClick={handleEditProduct}>
          Edit ✏️
        </div>
      )}

      
    </div>
  );
}

export default DropdownMenu;
