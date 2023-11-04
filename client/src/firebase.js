// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "planfund-33a8d.firebaseapp.com",
  projectId: "planfund-33a8d",
  storageBucket: "planfund-33a8d.appspot.com",
  messagingSenderId: "954509247541",
  appId: "1:954509247541:web:1152cffd5a3e141b2a1d7c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);