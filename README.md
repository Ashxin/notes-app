# 📝 Notes App

A full-stack note-taking application with real-time synchronization, built with vanilla JavaScript and Firebase.

## 🚀 Live Demo

[View Live Demo](#)  https://notes-app-ash.web.app/

## ✨ Features

- **User Authentication** - Secure sign up and login with Firebase Authentication
- **CRUD Operations** - Create, read, update, and delete notes
- **Real-time Sync** - Changes sync instantly across multiple devices/tabs
- **Data Persistence** - Notes stored in Firebase Firestore cloud database
- **User Isolation** - Each user can only see their own notes
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **XSS Protection** - All user content is sanitized before rendering

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Vanilla JavaScript with async/await

### Backend
- **Firebase Authentication** - Email/password authentication
- **Firebase Firestore** - NoSQL cloud database
- **Firebase Security Rules** - Server-side data protection

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account (free tier)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/notes-app.git
cd notes-app
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Email/Password
4. Create **Firestore Database** in production mode
5. Copy your Firebase config

### 3. Configure Firebase

Open `app.js` and replace the Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 4. Set Up Firestore Security Rules

In Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

### 5. Create Firestore Index

The app requires a composite index for efficient querying:

**Option A:** Click the link in browser console error (appears on first use)

**Option B:** Manual creation:
1. Firestore Console → Indexes → Create Index
2. Collection: `notes`
3. Fields: `userId` (Ascending), `updatedAt` (Descending)
4. Query scope: Collection

### 6. Run the App

```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx http-server

# Or use VS Code Live Server extension
```

Open `http://localhost:8000` in your browser.

## 📱 Usage

### Creating an Account
1. Click "Sign Up" tab
2. Enter email and password (min 6 characters)
3. Click "Sign Up" button

### Creating Notes
1. Click "+ New Note" button
2. Enter title and content
3. Click "Save Note"

### Editing Notes
1. Click "Edit" button on any note
2. Modify title/content
3. Click "Save Note"

### Deleting Notes
1. Click "Delete" button on any note
2. Confirm deletion

### Real-Time Sync Demo
1. Open app in two browser tabs
2. Login to same account in both
3. Create/edit/delete notes in one tab
4. Watch changes appear instantly in the other tab!

## 🏗️ Project Structure

```
notes-app/
├── index.html          # Main HTML file with auth UI and app interface
├── style.css           # Styling with green gradient theme
├── app.js              # Firebase config, authentication, CRUD operations
└── README.md           # This file
```

## 🔐 Security Features

- **Authentication Required** - All operations require valid login
- **User Isolation** - Users can only access their own notes
- **Firestore Security Rules** - Server-side validation
- **XSS Prevention** - HTML escaping on user content
- **Input Validation** - Client-side validation before database operations

## 🎯 Key Learning Outcomes

This project demonstrates:

- ✅ **Full-stack development** - Frontend + backend integration
- ✅ **Authentication systems** - User sign up, login, session management
- ✅ **Database operations** - CRUD with NoSQL database
- ✅ **Real-time data** - WebSocket-based synchronization
- ✅ **Security best practices** - Authentication, authorization, input sanitization
- ✅ **Asynchronous programming** - Promises, async/await, callbacks
- ✅ **Error handling** - Try-catch blocks, user-friendly error messages
- ✅ **State management** - Application state tracking
- ✅ **Cloud services** - Firebase Authentication and Firestore

## 🚀 Deployment

### Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting
firebase init hosting

# Deploy
firebase deploy --only hosting
```

### GitHub Pages

1. Push code to GitHub repository
2. Go to Settings → Pages
3. Source: Deploy from branch → main → / (root)
4. Save and wait 1-2 minutes
5. Visit: `https://yourusername.github.io/notes-app`

## 🐛 Troubleshooting

### "Query requires an index" Error
- Create the Firestore composite index (see Setup step 5)
- Wait 1-2 minutes for index to build
- Refresh the app

### Notes Not Loading
- Check browser console for errors
- Verify Firebase configuration is correct
- Ensure Firestore security rules are set up
- Check that you're logged in

### Authentication Errors
- Verify Email/Password auth is enabled in Firebase Console
- Check Firebase configuration in app.js
- Try hard refresh (Ctrl + Shift + R)

## 📈 Future Enhancements

- [ ] Rich text editor (formatting, lists, links)
- [ ] Note categories/tags
- [ ] Search functionality
- [ ] Dark mode toggle
- [ ] Export notes (PDF, TXT)
- [ ] Shared notes (collaboration)
- [ ] File attachments
- [ ] Offline support (PWA)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Aswin**
- GitHub: [@Ashxin](https://github.com/Ashxin)

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- Inspired by modern note-taking applications
- Built as part of web development learning journey

---

**⭐ If you found this project helpful, please give it a star!**
