// ======================================
// BUSINESSHUB FIREBASE CONFIGURATION
// ======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyASpTPdlJk4_6kuGkhX78U725kCknCqNBQ",
    authDomain: "businesshub-9cde9.firebaseapp.com",
    projectId: "businesshub-9cde9",
    storageBucket: "businesshub-9cde9.firebasestorage.app",
    messagingSenderId: "589096704985",
    appId: "1:589096704985:web:1660608dde7572f55597c8",
    measurementId: "G-60F0VLL9G4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Authentication
const auth = getAuth(app);


// Firestore Database
const db = getFirestore(app);


// Export so other BusinessHub pages can use them
export {
    app,
    auth,
    db
};