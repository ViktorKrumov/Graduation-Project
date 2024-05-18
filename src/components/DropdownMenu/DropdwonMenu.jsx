import React, { useState, useEffect } from "react";
import { SlActionRedo } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { addToCart, addToWishlist } from "../../firebase";
import { remove, ref } from "firebase/database";
import { getDatabase, set } from "firebase/database";
import { toast } from 'react-toastify'; 


import "./DropdownMenu.css";

function DropdownMenu({product, onEdit, databaseNode }) {
  const [userProducts, setUserProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const isAdmin = localStorage.getItem('isAdmin');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');
  

  const handleDeleteProduct = async () => {
    const db = getDatabase();
    const productRef = ref(db, `${databaseNode}/${product.id - 1}`);

    try {
      setIsDeleting(true);
      await remove(productRef);
      toast.success("Product deleted successfully!"); 
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product."); 
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

    const fetchWishlistProducts = async () => {
      const db = getFirestore();
      const q = query(collection(db, "Wishlist"), where("email", "==", userEmail));

      try {
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data().product,
            photo: doc.data().productPhoto,
            price: doc.data().productPrice,
          }));
          setWishlistProducts(products);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserProducts();
      fetchWishlistProducts();
    }
  }, [isLoggedIn, userEmail]);

  const handleAddToCart = async () => {

    if (isLoggedIn) {
      const existingProduct = userProducts.find((item) => item.data === product.name);
      if (existingProduct) {
        const newQuantity = existingProduct.quantity + 1;
        handleQuantityChange(existingProduct.id, newQuantity);
      } else {
        addToCart(userEmail, product.name, product.photo, product.original_price, 1);
        toast.success("Added to cart successfully!"); 
      }
    } else {
      toast.success("Added to cart successfully!"); 
    }
  };

  const handleAddToWishlist = () => {
    if (isLoggedIn) {
      const existingProduct = wishlistProducts.find((item) => item.data === product.name);
      if (existingProduct) {
        toast.warning("The product is already added to wishlist");
      } else {
        addToWishlist(userEmail, product.name, product.photo, product.original_price);
        toast.success("Added to wishlist successfully!");
      }
    } else {
      toast.success("Added to wishlist successfully!");
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
      toast.success("Quantity updated successfully!"); 
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error("Error updating quantity."); 
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
