// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDwga6iy-p67oc7C7gm7DDRKNGcJR1vB3c",
  authDomain: "web-cloud-ynov-a567e.firebaseapp.com",
  projectId: "web-cloud-ynov-a567e",
  storageBucket: "web-cloud-ynov-a567e.appspot.com",
  messagingSenderId: "565489849484",
  appId: "1:565489849484:web:210157495aa4e858c997a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export default app;