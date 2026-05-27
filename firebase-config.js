// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB816cxIsZa9RErNf8ab4vNI6ruB9FEnaA",
  authDomain: "capstone-bueni.firebaseapp.com",
  databaseURL: "https://capstone-bueni-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "capstone-bueni",
  storageBucket: "capstone-bueni.firebasestorage.app",
  messagingSenderId: "399364970465",
  appId: "1:399364970465:web:48bc0b9d8f5dcbc384e4a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);