// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "zomat-delivery-app.firebaseapp.com",
  projectId: "zomat-delivery-app",
  storageBucket: "zomat-delivery-app.firebasestorage.app",
  messagingSenderId: "20658895482",
  appId: "1:20658895482:web:ccae544c8a21fa680399c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}