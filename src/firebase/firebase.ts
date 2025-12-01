import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

console.log("Firebase API Key: ", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log("Firebase Auth Domain: ", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log("Firebase Project ID: ", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log("Firebase Storage Bucket: ", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
console.log("Firebase Messaging Sender ID: ", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID);
console.log("Firebase App ID: ", process.env.NEXT_PUBLIC_FIREBASE_APP_ID);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (prevent multiple initialization)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//Add scopes for additional Google data
googleProvider.addScope('profile');
googleProvider.addScope('email');