// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDoxuBvs6nYtMbkMWm1RJBknhrvtkV9BLQ',
  authDomain: 'plate-share-3d28c.firebaseapp.com',
  projectId: 'plate-share-3d28c',
  storageBucket: 'plate-share-3d28c.firebasestorage.app',
  messagingSenderId: '259405422581',
  appId: '1:259405422581:web:ef225678d159bcfe450abc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);