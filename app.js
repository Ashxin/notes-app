// ===== FIREBASE CONFIGURATION =====
const firebaseConfig = {
    // ⚠️ PASTE YOUR CONFIG HERE (from Firebase Console)
  apiKey: "AIzaSyAIifkY6ncDcCTpYXycUXys769lDwoa760",
  authDomain: "notes-app-ash.firebaseapp.com",
  projectId: "notes-app-ash",
  storageBucket: "notes-app-ash.firebasestorage.app",
  messagingSenderId: "822576163731",
  appId: "1:822576163731:web:ad3fe216113484939cd666"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// ===== DOM ELEMENTS =====
const authSection = document.querySelector("#authSection");
const appSection = document.querySelector("#appSection");
const loginTab = document.querySelector("#loginTab");
const signupTab = document.querySelector("#signupTab");
const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");
const authMessage = document.querySelector("#authMessage");
const userEmail = document.querySelector("#userEmail");
const logoutBtn = document.querySelector("#logoutBtn");
const newNoteBtn = document.querySelector("#newNoteBtn");
const notesList = document.querySelector("#notesList");

console.log("Notes App loaded!");
console.log("Firebase initialized:", firebase.app().name);