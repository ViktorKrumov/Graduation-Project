import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, firebaseConfig};
