// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDJ_g49rJh8PypbkBTbkm-RZA5ddzTXpFY',
  authDomain: 'escape-agency.firebaseapp.com',
  projectId: 'escape-agency',
  storageBucket: 'escape-agency.appspot.com',
  messagingSenderId: '587161053942',
  appId: '1:587161053942:web:d380e17607d2ca8945dad7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase
const db = getFirestore(app);

// Get a reference to the database service
export { db, app };
