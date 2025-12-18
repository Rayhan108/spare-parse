import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey:"AIzaSyCBfOJ6f3Fur9-4EEi0bTI2hX9_pB_-kjY",
  authDomain:"hatem-ecommerce.firebaseapp.com",
  projectId:"hatem-ecommerce",
  storageBucket:"process.env.hatem-ecommerce.firebasestorage.app",
  messagingSenderId:"449082078614",
  appId:"1:449082078614:web:0b1b5d2af00b50c53359b7",
  // apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (prevent multiple initialization)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//Add scopes for additional Google data
googleProvider.addScope('profile');
googleProvider.addScope('email');