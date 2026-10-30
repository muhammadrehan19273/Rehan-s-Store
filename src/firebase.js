import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAidx6vV9bJufo_EFuPIO2McYoMzMsUIcs",
  authDomain: "rehan-s-store.firebaseapp.com",
  projectId: "rehan-s-store",
  storageBucket: "rehan-s-store.firebasestorage.app",
  messagingSenderId: "135500015052",
  appId: "1:135500015052:web:5de4536fe1547283396969"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
