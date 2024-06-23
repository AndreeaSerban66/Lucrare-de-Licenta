import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "webapp-9ebc4.firebaseapp.com",
  projectId: "webapp-9ebc4",
  storageBucket: "webapp-9ebc4.appspot.com",
  messagingSenderId: "503020775346",
  appId: "1:503020775346:web:97b7e8444536a1d5dde6ab"
};

export const app = initializeApp(firebaseConfig);