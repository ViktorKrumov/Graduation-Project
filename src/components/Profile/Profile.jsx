import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import EditProfileForm from './EditProfileForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "./Profile.css";

const Profile = ({ handleLogout }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const querySnapshot = await getDocs(query(collection(db, 'UserDetails'), where('email', '==', user.email)));
        if (querySnapshot.empty) {
          try {
            await setDoc(doc(db, 'UserDetails', user.uid), {
              email: user.email,
              fullName: 'N/A',
              bio: 'N/A',
              phoneNumber: 'N/A',
              dateOfBirth: 'N/A',
              address: 'N/A',
              createdAt: new Date()
            });
            setUserData({
              email: user.email,
              fullName: 'N/A',
              bio: 'N/A',
              phoneNumber: 'N/A',
              dateOfBirth: 'N/A',
              address: 'N/A',
              createdAt: new Date()
            });
          } catch (error) {
            console.error('Error creating user data:', error);
          }
        } else {
          querySnapshot.forEach((doc) => {
            setUserData({ ...doc.data(), id: doc.id });
          });
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
      if (photo) {
        const storageRef = ref(storage, `userPhotos/${userData.id}`);
        await uploadBytes(storageRef, photo);
        const photoURL = await getDownloadURL(ref(storage, `userPhotos/${userData.id}`));
        updatedUserData.photo = photoURL;
      }
      await setDoc(doc(db, 'UserDetails', userData.id), updatedUserData);
      setIsEditing(false);
      setUserData(updatedUserData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div>
      {userData ? (
        <>
          {isEditing ? (
            <EditProfileForm
              userData={userData}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <ProfileInfo
              userData={userData}
              onEdit={handleEdit}
            />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
