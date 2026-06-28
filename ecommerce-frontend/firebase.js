// Initialize Firebase

// Import Firebase
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCvt9tUAKtuXv1z3pfT_Jhd1AX9kR9KOIo",
//   authDomain: "shopping-dukan-13ebc.firebaseapp.com",
//   projectId: "shopping-dukan-13ebc",
//   storageBucket: "shopping-dukan-13ebc.firebasestorage.app",
//   messagingSenderId: "615614365434",
//   appId: "1:615614365434:web:ae1c1e1a14d8a4d0e79343",
//   measurementId: "G-1M9HL7CJ49"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Authentication
// const auth = getAuth(app);

// // Export auth
// export { auth };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvt9tUAKtuXv1z3pfT_Jhd1AX9kR9KOIo",
  authDomain: "shopping-dukan-13ebc.firebaseapp.com",
  projectId: "shopping-dukan-13ebc",
  storageBucket: "shopping-dukan-13ebc.firebasestorage.app",
  messagingSenderId: "615614365434",
  appId: "1:615614365434:web:d1f6cb028ce8db74e79343",
  measurementId: "G-CZX5KMW46B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




























