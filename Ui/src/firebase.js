import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdCxWrpX0dGww9yplNeiGtJOqdE5PpEKM",
  authDomain: "petify-25a65.firebaseapp.com",
  projectId: "petify-25a65",
  storageBucket: "petify-25a65.firebasestorage.app",
  messagingSenderId: "944278132047",
  appId: "1:944278132047:web:10cdf159999aa453f8613a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;