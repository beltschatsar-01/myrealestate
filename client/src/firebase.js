// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-f238b.firebaseapp.com",
  projectId: "realestate-f238b",
  storageBucket: "realestate-f238b.appspot.com",
  messagingSenderId: "950519278663",
  appId: "1:950519278663:web:a41a1f452aa3d29edd5562"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
