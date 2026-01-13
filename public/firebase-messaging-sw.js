// /* eslint-disable no-undef */
// importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyCw_dCg-k3F5LutUMwkdUZFX2vbdLo9T38",
//   authDomain: "hatem-e-commerce-auth.firebaseapp.com",
//   projectId: "hatem-e-commerce-auth",
//   storageBucket: "hatem-e-commerce-auth.appspot.com",
//   messagingSenderId: "640376190877",
//   appId: "2a0639904fbd0f3903a174",
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log("Received background message:", payload);
// });




// // NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCw_dCg-k3F5LutUMwkdUZFX2vbdLo9T38
// // NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hatem-e-commerce-auth.firebaseapp.com
// // NEXT_PUBLIC_FIREBASE_PROJECT_ID=hatem-e-commerce-auth
// // NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hatem-e-commerce-auth.appspot.com
// // NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=640376190877
// // NEXT_PUBLIC_FIREBASE_APP_ID=1:640376190877:web:2a0639904fbd0f3903a174




/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCw_dCg-k3F5LutUMwkdUZFX2vbdLo9T38",
  authDomain: "hatem-e-commerce-auth.firebaseapp.com",
  projectId: "hatem-e-commerce-auth",
  storageBucket: "hatem-e-commerce-auth.firebasestorage.app",
  messagingSenderId: "640376190877",
  appId: "1:640376190877:web:2a0639904fbd0f3903a174",
});

const messaging = firebase.messaging();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
messaging.onBackgroundMessage((payload) => {
  // console.log("📩 Received background message:", payload);
});
