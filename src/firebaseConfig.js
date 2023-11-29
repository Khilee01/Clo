// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbM3gtgeHEhD1cNqCcEH9fKQzNYBfbG-s",
  authDomain: "fsd-clo.firebaseapp.com",
  projectId: "fsd-clo",
  storageBucket: "fsd-clo.appspot.com",
  messagingSenderId: "831392116192",
  appId: "1:831392116192:web:baf58d0da71e5320458f85",
  measurementId: "G-118WMSFWKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);