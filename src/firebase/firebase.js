import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
console.log(process.env.REACT_APP_FIREBASE_CONFIG);
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};