/* eslint-disable @typescript-eslint/no-unused-vars */

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};


const app = initializeApp(firebaseConfig);

export const requestForToken = async (): Promise<string | null> => {
  try {
    const supported = await isSupported();
    if (!supported) throw new Error("This browser doesn't support FCM");

    const messaging = getMessaging(app);

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (token) {
      // console.log(" FCM Token:", token);
      return token;
    } else {
      // console.warn("No registration token available. Request permission first.");
      return null;
    }
  } catch (err) {
    // console.error(" Error getting FCM token:", err);
    return null;
  }
};


export const onMessageListener = async () =>
  new Promise((resolve) => {
    isSupported().then((supported) => {
      if (!supported) return;
      const messaging = getMessaging(app);
      onMessage(messaging, (payload) => resolve(payload));
    });
  });
