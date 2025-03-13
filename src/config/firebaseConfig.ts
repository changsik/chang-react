import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUGlCq0kGvLrzTWX1x02ucmZNZhHrzVcA",
  authDomain: "chang-react-cabbc.firebaseapp.com",
  projectId: "chang-react-cabbc",
  storageBucket: "chang-react-cabbc.firebasestorage.app",
  messagingSenderId: "637810794010",
  appId: "1:637810794010:web:03bf01a68526789a7c3ba3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();