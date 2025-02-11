import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1_-v4CPMRkhstUIZj1rnsGeU1br3uXgU",
  authDomain: "gestaodedespesas-7b48e.firebaseapp.com",
  projectId: "gestaodedespesas-7b48e",
  storageBucket: "gestaodedespesas-7b48e.firebasestorage.app",
  messagingSenderId: "686803956002",
  appId: "1:686803956002:web:b816c5e3fde839e7f7357b",
  measurementId: "G-28EXMJNC12",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
