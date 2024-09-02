// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCntXGi8NcUPyMckp-ZECnnN0rY4DnO7xc",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "rainfallandtemperature",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "391132468221"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
