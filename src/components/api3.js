import { initializeApp } from 'firebase/app';
import {firebaseConfig} from '../firebase'
import { getDatabase, ref, get } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const fetchData = async () => {
  try {
    const snapshot = await get(ref(database, 'monitors'));
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export { fetchData };