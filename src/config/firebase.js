import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzDQAsJS1yx1IvqhEXXQRuSv51gvYhXfA",
  authDomain: "intern-9d6b1.firebaseapp.com",
  projectId: "intern-9d6b1",
  storageBucket: "intern-9d6b1.appspot.com",
  messagingSenderId: "963279786149",
  appId: "1:963279786149:web:f4661e9785471791edbd4c",
  measurementId: "G-MW4ED6C73N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 

export const db = getFirestore(app);
export const storage = getStorage(app);
