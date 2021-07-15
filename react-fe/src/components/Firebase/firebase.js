import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBbGwN6ZwSfF0V2_VCPvs55frVSc8JP32Q",
  authDomain: "cpsc455.firebaseapp.com",
  projectId: "cpsc455",
  storageBucket: "cpsc455.appspot.com",
  messagingSenderId: "537947113977",
  appId: "1:537947113977:web:acbd83278b36d678165528",
  measurementId: "G-2Q1G5P5BJ3"
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      this.auth = firebase.auth();
    }
  }

  /* Auth API */
  firebaseRegisterUserEmailPass = (email, password) => {
    this.auth.createUserWithEmailAndPassword(email, password);
  };

  firebaseSignInEmailAndPassword = (email, password) => {
    this.auth.signInWithEmailAndPassword(email, password);
  };

  firebaseSignOut = () => this.auth.signOut();

  firebasePasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  firebasePasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  getUser = () => { return this.auth.currentUser; };
};

export default Firebase;
