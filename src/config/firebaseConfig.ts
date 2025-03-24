import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAUGlCq0kGvLrzTWX1x02ucmZNZhHrzVcA",
//   authDomain: "chang-react-cabbc.firebaseapp.com",
//   projectId: "chang-react-cabbc",
//   storageBucket: "chang-react-cabbc.firebasestorage.app",
//   messagingSenderId: "637810794010",
//   appId: "1:637810794010:web:03bf01a68526789a7c3ba3"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();