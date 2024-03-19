import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDlb-kd6pQy8mCf4Y19X98tqCFseg2bT6A",
  authDomain: "technoshack-cbd13.firebaseapp.com",
  projectId: "technoshack-cbd13",
  databaseURL: "https://technoshack-cbd13-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "technoshack-cbd13.appspot.com",
  messagingSenderId: "61352720868",
  appId: "1:61352720868:web:84164ee51dc88043552ff1",
  measurementId: "G-93RE6G13KP"
};

async function addToCart(email, productName, productPhoto, productPrice) {
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, 'Cart'), {
      email: email,
      product: productName,
      productPhoto: productPhoto,
      productPrice: productPrice,
      quantity: 1, 
      createdAt: new Date()
    });
    console.log("Product added to cart with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding product to cart: ", e);
  }
}



async function addToOrders(fullName, email, address, city, zipCode, items) {
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, 'Orders'), {
      fullName: fullName,
      email: email,
      address: address,
      city: city,
      zipCode: zipCode,
      items: items,
      createdAt: new Date()
    });
    console.log("Order added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding order: ", e);
  }
}

async function addUserDetails(email, fullName,userPhoto, phoneNumber, dateOfBirth, adress) {
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, 'UserDetails'), {
      email: email,
      fullName: fullName,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      adress:adress,
      userPhoto:userPhoto,
      createdAt: new Date()
    });
    console.log("Order added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding order: ", e);
  }
}

async function addToWishlist(email, productName, productPhoto, productPrice) {
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, 'Wishlist'), {
      email: email,
      product: productName,
      productPhoto: productPhoto,
      productPrice: productPrice,
      createdAt: new Date()
    });
    console.log("Order added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding order: ", e);
  }
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, firebaseConfig, addToCart, addToWishlist, addUserDetails, addToOrders};
