import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY.toString(),
  authDomain: "mytube-eaf2f.firebaseapp.com",
  projectId: "mytube-eaf2f",
  storageBucket: "mytube-eaf2f.firebasestorage.app",
  messagingSenderId: "563415720385",
  appId: "1:563415720385:web:608e6ee705fad0cac04f40",
  measurementId: "G-1BXM22QJ77",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export default app;
