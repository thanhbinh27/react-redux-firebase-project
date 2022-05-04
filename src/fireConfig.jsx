// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVareyRtuIZlUykPBK4ndd-E_y1KCQjnc",
  authDomain: "thanhbinh-reactjs-fc.firebaseapp.com",
  projectId: "thanhbinh-reactjs-fc",
  storageBucket: "thanhbinh-reactjs-fc.appspot.com",
  messagingSenderId: "400941863258",
  appId: "1:400941863258:web:9b9f8d4aa783b9ba7aa363",
  measurementId: "G-C15VEH75DK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)
export default fireDB;

