// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "findit-3a010.firebaseapp.com",
  projectId: "findit-3a010",
  appId: "1:968108354733:web:56b7d4bbea2914add3ea24"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
