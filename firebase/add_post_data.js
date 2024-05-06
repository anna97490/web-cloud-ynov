import app from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
const db = getFirestore(app);

export const createPost = async (title, text, createdBy) => {
  try {
    // Add the document to the collection
    const newDocRef = await addDoc(collection(db, 'posts'), {
      title, text, createdBy, date: new Date()
    });

    // Log the document ID
    console.log('New document added with ID:', newDocRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}