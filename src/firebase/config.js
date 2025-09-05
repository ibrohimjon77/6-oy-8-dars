import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbPcMPs0i3uFSHPEJN6dKDnhwzaXfNebM",
  authDomain: "procet-2.firebaseapp.com",
  projectId: "procet-2",
  storageBucket: "procet-2.firebasestorage.app",
  messagingSenderId: "152362208254",
  appId: "1:152362208254:web:be807d7cebd5a3715d8eaf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth =getAuth(app)


//db
export const db =getFirestore(app)