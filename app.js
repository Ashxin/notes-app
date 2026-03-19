// ===== FIREBASE CONFIGURATION =====
const firebaseConfig = {
  apiKey: "AIzaSyAIifkY6ncDcCTpYXycUXys769lDwoa760",
  authDomain: "notes-app-ash.firebaseapp.com",
  projectId: "notes-app-ash",
  storageBucket: "notes-app-ash.firebasestorage.app",
  messagingSenderId: "822576163731",
  appId: "1:822576163731:web:ad3fe216113484939cd666"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

console.log("Notes App loaded!");
console.log("Firebase initialized:", firebase.app().name);

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded!");
    
    // Check if elements exist
    console.log("loginEmail exists?", document.querySelector("#loginEmail"));
    console.log("loginPassword exists?", document.querySelector("#loginPassword"));
    console.log("loginForm exists?", document.querySelector("#loginForm"));
    
    // Only proceed if elements exist
    const loginEmailInput = document.querySelector("#loginEmail");
    const loginPasswordInput = document.querySelector("#loginPassword");
    const loginForm = document.querySelector("#loginForm");
    
    if (!loginEmailInput) {
        console.error("ERROR: loginEmail input not found in HTML!");
        return;
    }
    
    if (!loginPasswordInput) {
        console.error("ERROR: loginPassword input not found in HTML!");
        return;
    }
    
    if (!loginForm) {
        console.error("ERROR: loginForm not found in HTML!");
        return;
    }
    
    console.log("All elements found successfully!");
    
    // Rest of your code...
    const authSection = document.querySelector("#authSection");
    const appSection = document.querySelector("#appSection");
    const loginTab = document.querySelector("#loginTab");
    const signupTab = document.querySelector("#signupTab");
    const signupForm = document.querySelector("#signupForm");
    const authMessage = document.querySelector("#authMessage");
    const userEmail = document.querySelector("#userEmail");
    const logoutBtn = document.querySelector("#logoutBtn");
    const noteModal = document.querySelector("#noteModal");
    const modalTitle = document.querySelector("#modalTitle");
    const closeModal = document.querySelector("#closeModal");
    const noteForm = document.querySelector("#noteForm");
    const noteTitle = document.querySelector("#noteTitle");
    const noteContent = document.querySelector("#noteContent");
    const cancelBtn = document.querySelector("#cancelBtn");
    const saveNoteBtn = document.querySelector("#saveNoteBtn");
    
    let currentUser = null;
    let editingNoteId = null;

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
        
        console.log("Login form submitted!");
        console.log("Email input:", loginEmailInput);
        console.log("Password input:", loginPasswordInput);
        
        let email = loginEmailInput.value.trim();
        let password = loginPasswordInput.value;
        
        console.log("Email:", email);
        
        loginUser(email, password);
    });

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        let email = document.querySelector("#signupEmail").value.trim();
        let password = document.querySelector("#signupPassword").value;
        let confirmPassword = document.querySelector("#signupPasswordConfirm").value;
        
        if (password !== confirmPassword) {
            showAuthMessage("Passwords don't match!", "error");
            return;
        }
        
        if (password.length < 6) {
            showAuthMessage("Password must be at least 6 characters", "error");
            return;
        }
        
        signupUser(email, password);
    });

    logoutBtn.addEventListener("click", function() {
        logoutUser();
    });

    newNoteBtn.addEventListener("click", function() {
      openNoteModal();
    });

    closeModal.addEventListener("click", function () {
      closeNoteModal();
    });

    cancelBtn.addEventListener("click", function () {
      closeNoteModal();
    });

    noteModal.addEventListener("click", function (event) {
      if (event.target === noteModal) {
        closeNoteModal();
      }
    });


    noteForm.addEventListener("submit", function (event) {
      event.preventDefault();
      saveNote();
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
                showAuthMessage(errorMessage, "error");
            });
    }

    function loginUser(email, password) {
        showAuthMessage("Logging in...", "");
        
        auth.signInWithEmailAndPassword(email, password)
            .then(function(userCredential) {
                showAuthMessage("Login successful!", "success");
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
            });
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
            loadNotes();
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

    function openNoteModal(noteId = null) {
        editingNoteId = noteId;

        if (noteId) {
            modalTitle.textContent = "Edit Note";
            loadNoteForEdit(noteId);
        } else {
            modalTitle.textContent = "New Note";
            noteForm.reset();
        }
        noteModal.classList.remove("hidden");
    }

    function closeNoteModal() {
        noteModal.classList.add("hidden");
        noteForm.reset();
        editingNoteId = null;
    }

    function saveNote() {
        let title = noteTitle.value.trim();
        let content = noteContent.value.trim();

        if (!title || !content) {
            alert("Please fill in all fields");
            return;
        }

        let noteData = {
            title: title,
            content: content,
            userId: currentUser.uid,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if(editingNoteId) {
            db.collection("notes").doc(editingNoteId).update(noteData)
                .then(function() {
                    console.log("Note updated successfully");
                    closeNoteModal();
                })
                .catch(function(error) {
                    console.error("Error updating note:", error);
                    alert("Failed to update note. Please try again"); 
                });
        } else {
            noteData.createdAt = firebase.firestore.FieldValue.serverTimestamp();

            db.collection("notes").add(noteData)
                .then(function(docRef) {
                    console.log("Note created with ID:", docRef.id);
                    closeNoteModal();
                })
                .catch(function(error) {
                    console.error("Error creating note:", error);
                    alert("Failed to create note. Please try again")
                });
        }
    }

    function loadNotes() {
        if (!currentUser) return;
    
    // NO .orderBy() - works without index!
        db.collection("notes")
        .where("userId", "==", currentUser.uid)
        .onSnapshot(function(snapshot) {
            // Sort in JavaScript instead
            let sortedDocs = snapshot.docs.sort(function(a, b) {
                let aTime = a.data().updatedAt ? a.data().updatedAt.toMillis() : 0;
                let bTime = b.data().updatedAt ? b.data().updatedAt.toMillis() : 0;
                return bTime - aTime;
            });
            
            displayNotes(sortedDocs);
        }, function(error) {
            console.error("Error loading notes:", error);
        });
    }

    // Function to display notes
function displayNotes(docs) {
    notesList.innerHTML = "";
    
    if (docs.length === 0) {
        notesList.innerHTML = '<p class="no-notes">No notes yet. Create your first note!</p>';
        return;
    }
    
    docs.forEach(function(doc) {
        let note = doc.data();
        let noteCard = document.createElement("div");  // ✅ noteCard (with 'e')
        noteCard.className = "note-card";
        
        // Format date
        let dateText = note.updatedAt ? formatDate(note.updatedAt.toDate()) : "Just now";
        
        noteCard.innerHTML = `
            <div class="note-card-header">
                <div>
                    <h3 class="note-card-title">${escapeHtml(note.title)}</h3>
                    <p class="note-card-date">${dateText}</p>
                </div>
            </div>
            <p class="note-card-content">${escapeHtml(note.content)}</p>
            <div class="note-card-actions">
                <button class="edit-btn" data-id="${doc.id}">Edit</button>
                <button class="delete-note-btn" data-id="${doc.id}">Delete</button>
            </div>
        `;
        
        // Edit button - ✅ noteCard (with 'e')
        noteCard.querySelector(".edit-btn").addEventListener("click", function(event) {
            event.stopPropagation();
            openNoteModal(doc.id);
        });
        
        // Delete button - ✅ noteCard (with 'e')
        noteCard.querySelector(".delete-note-btn").addEventListener("click", function(event) {
            event.stopPropagation();
            deleteNote(doc.id);
        });
        
        notesList.appendChild(noteCard);  // ✅ noteCard (with 'e')
    });
}


    function loadNoteForEdit(noteId) {
        db.collection("notes").doc(noteId).get()
            .then(function(doc) {
                if(doc.exists) {
                    let note = doc.data();
                    noteTitle.value = note.title;
                    noteContent.value = note.content;
                }
            })
            .catch(function(error) {
                console.error("Error loading note:", error);
            });
    }

    function deleteNote(noteId) {
        if (!confirm("Are you sure you want to delete this note?")) {
            return;
        }

        db.collection("notes").doc(noteId).delete()
            .then(function() {
                console.log("Note deleted successfully");
            })
            .catch(function(error) {
                console.error("Error deleting note:", error);
                alert("Failed to delete note. Please try again.");
            });
        }

        function formatDate(date) {
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let month = months[date.getMonth()];
            let day = date.getDate();
            let year = date.getFullYear();
            return `${month} ${day}, ${year}`;
        }

        function escapeHtml(text) {
            let div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

});