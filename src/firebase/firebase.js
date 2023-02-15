import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBrL5pIB3M2nxIQd3VbLgSRLXkIYLl_P4",
  authDomain: "note-taking-app-17942.firebaseapp.com",
  projectId: "note-taking-app-17942",
  storageBucket: "note-taking-app-17942.appspot.com",
  messagingSenderId: "817848863369",
  appId: "1:817848863369:web:93740e2632f2fb07f39458"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};