import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import EditProfileForm from './EditProfileForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userOrders, setUserOrders] = useState([]); 
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDataQuerySnapshot = await getDocs(
            query(collection(db, 'UserDetails'), where('email', '==', user.email))
          );

          if (userDataQuerySnapshot.empty) {
            // If user profile not found, create one
            const userDataRef = doc(db, 'UserDetails', user.uid);
            await setDoc(userDataRef, {
              email: user.email,
              fullName: '',
              bio: '',
              phoneNumber: '',
              dateOfBirth: '',
              address: '',
              createdAt: new Date()
            });
            const userDataDoc = await getDoc(userDataRef);
            if (userDataDoc.exists()) {
              setUserData({ ...userDataDoc.data(), id: userDataDoc.id });
            } else {
              console.error('User data not found after creation');
             }
         } else {
            // Set user profile data
              const doc = userDataQuerySnapshot.docs[0];
              setUserData({ ...doc.data(), id: doc.id });
          }

          // Fetch user orders
          const userOrdersQuerySnapshot = await getDocs(
            query(collection(db, 'Orders'), where('email', '==', user.email))
          );

          const ordersData = [];
          userOrdersQuerySnapshot.forEach((order) => {
            ordersData.push({ ...order.data(), id: order.id });
          });
          setUserOrders(ordersData);
          console.log('User orders:', userOrders); 

          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      } else {
        navigate('/login');
      }
    });
    return unsubscribe;
  }, [auth, db, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedUserData, photo) => {
    try {
      if (!userData || !userData.id) {
        console.error(
          'Error saving user data: userData is undefined, null, or does not have an id'
        );
        return;
      }

      if (photo) {
        const storageRef = ref(storage, `userPhotos/${userData.id}`);
        await uploadBytes(storageRef, photo);
        const photoURL = await getDownloadURL(
          ref(storage, `userPhotos/${userData.id}`)
        );
        updatedUserData.photo = photoURL;
      }

      await setDoc(doc(db, 'UserDetails', userData.id), updatedUserData);
      setIsEditing(false);
      setUserData(updatedUserData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };

  return (
    <div className="profile-container">
  <div className="profile-detail-container">
    {loading ? (
      <p>Loading...</p>
    ) : (
      <>
        {userData ? (
          <>
            {isEditing ? (
              <EditProfileForm
                userData={userData}
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <div className="profile-info-container">
                <ProfileInfo userData={userData} onEdit={handleEdit} />
                <button className="edit-button" onClick={toggleOrders}>
                  {showOrders ? 'Hide Orders' : 'Show Orders'}
                </button>
              </div>
            )}
          </>
        ) : (
          <p>No user data found</p>
        )}
      </>
    )}
  </div>

      {showOrders && (
        <div className="order-container">
          <h2>User Orders:</h2>
          {userOrders.map((order) => (
            <div key={order.id} className="order-item">
              <h3 className="order-id">Order ID: {order.id}</h3>
              <ul className="order-items">
                {order.items && order.items.map((item) => (
                  <li key={item.productId}>
                    <span className="product-name">Product: {item.productName}</span>
                    <span className="quantity">Quantity: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
