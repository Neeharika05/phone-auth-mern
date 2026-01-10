import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';



// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByVF1F7mCXCBm7pGT2akgPRNCJU2VqWjA",
  authDomain: "pro-1-8c112.firebaseapp.com",
  projectId: "pro-1-8c112",
  storageBucket: "pro-1-8c112.firebasestorage.app",
  messagingSenderId: "1069390441820",
  appId: "1:1069390441820:web:48c42b29320b4f4c002599"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
