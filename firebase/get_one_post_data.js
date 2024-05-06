import app from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc } from "firebase/firestore";

const db = getFirestore(app);

export const getOnePostData = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}