import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import EditProfileForm from './EditProfileForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "./Profile.css"; 

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const querySnapshot = await getDocs(query(collection(db, 'UserDetails'), where('email', '==', user.email)));
          if (querySnapshot.empty) {
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
              setLoading(false);
            } else {
              console.error('User data not found after creation');
              setLoading(false);
            }
          } else {
            querySnapshot.forEach((doc) => {
              setUserData({ ...doc.data(), id: doc.id });
              setLoading(false);
            });
          }
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
        console.error('Error saving user data: userData is undefined, null, or does not have an id');
        return;
      }

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
                <ProfileInfo
                  userData={userData}
                  onEdit={handleEdit}
                />
              )}
            </>
          ) : (
            <p>No user data found</p>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
