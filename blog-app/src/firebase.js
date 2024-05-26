// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  //   apiKey: import.meta.env.FIREBASE_API_KEY,
  apiKey: "AIzaSyDokrWmN5VwpdV2gJOkg5dIhTyNaJ0ud24",
  authDomain: "mern-blog-d1def.firebaseapp.com",
  projectId: "mern-blog-d1def",
  storageBucket: "mern-blog-d1def.appspot.com",
  messagingSenderId: "460073314591",
  appId: "1:460073314591:web:fd86c9f6f7cc889947682a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
