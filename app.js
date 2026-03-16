// ===== FIREBASE CONFIGURATION =====
const firebaseConfig = {
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

document.addEventListener("DOMContentLoaded", function(){

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



let currentUser = null;

auth.onAuthStateChanged(function(user) {
  if (user) {
    currentUser = user;
    showApp();
    console.log("User logged in:", user.email);
  } else {
    currentUser = null;
    showAuth();
    console.log("User logged out");
  }
});

loginTab.addEventListener("click", function() {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  clearAuthMessage();
});

signupTab.addEventListener("click", function() {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  clearAuthMessage();
});

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let email = document.querySelector("#loginEmail").value.trim();
  let password = document.querySelector("#loginPassword").value;

  loginUser(email, password);
});

signupForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let email = document.querySelector("#signupEmail").value.trim();
  let password = document.querySelector("signupPassword").value;
  let confrimPassword = document.querySelector("#signupPasswordConfirm").value;

  if(password !== confrimPassword) {
    showAuthMessage("Passwords don't match!", "error");
    return;
  }

  if(password.length < 6) {
    showAuthMessage("Password must be at least 6 characters", "error");
    return;
  }

  signupUser(email, password);
});

logoutBtn.addEventListener("click", function() {
  logoutUser();
});


function signupUser(email, password) {
  showAuthMessage("Creating account...", "");
  auth.createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      showAuthMessage("Account created successfully!", "success");

      signupForm.reset();
    })
    .catch(function(error) {
      let errorMessage = getErrorMessage(error.code);
      showAuthMessage(errorMessage, "error")
    });
}

function loginUser(email, password) {
  showAuthMessage("Logging in...", "");

  auth.signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      showAuthMessage("Login successful", "success");

      loginForm.reset();
    })

    .catch(function(error) {
      let errorMessage = getErrorMessage(error.code);
      showAuthMessage(errorMessage, "error");
    });
}

function logoutUser() {
  auth.signOut()
    .then(function() {
      console.log("User signed out successfully");
    })
    .catch(function(error) {
      console.log("Logout error:", error);      
    })
}

function showAuth() {
  authSection.classList.remove("hidden");
  appSection.classList.add("hidden");
}

function showApp() {
  authSection.classList.add("hidden");
  appSection.classList.remove("hidden");

  if (currentUser) {
    userEmail.textContent = currentUser.email;
  }
}

function showAuthMessage(message, type) {
  authMessage.textContent = message;
  authMessage.className = "auth-message";

  if (type === "error") {
    authMessage.classList.add("error");
  } else if (type === "success") {
    authMessage.classList.add("success");
  }

  if (type) {
    setTimeout(function() {
      clearAuthMessage();
    }, 5000);
  }
}

function clearAuthMessage() {
  authMessage.textContent = "";
  authMessage.className = "auth-message";
}

function getErrorMessage(errorCode) {
  let messages = {
    "auth/email-already-in-use": "This email is already registered. Please login instead.",
    "auth/invalid-email": "Invalid email address format.",
    "auth/weak-password": "Password is too weak. Use at least 6 characters.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Please check your connection."
    };

    return messages[errorCode] || "An error occurred. Please try again.";
}

});

console.log("Notes App loaded!");
console.log("Firebase initialized:", firebase.app().name);