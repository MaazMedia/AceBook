// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCINHrroACK3wSrT0pLdREEUhBaHLzGUvk",
  authDomain: "acebook-7564f.firebaseapp.com",
  projectId: "acebook-7564f",
  storageBucket: "acebook-7564f.appspot.com",
  messagingSenderId: "339717602076",
  appId: "1:339717602076:web:7ff700add5fa5476edd8d9",
  measurementId: "G-QM1P4BVPFP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { app, db, auth };
