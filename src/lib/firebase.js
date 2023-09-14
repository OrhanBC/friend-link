import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDPxPutMmexaARvJLArh-frJtgNzq9_0k8",
  authDomain: "social-media-website-618ed.firebaseapp.com",
  projectId: "social-media-website-618ed",
  storageBucket: "social-media-website-618ed.appspot.com",
  messagingSenderId: "1045602241031",
  appId: "1:1045602241031:web:70bf6f4638e7dc9472f8a2",
  measurementId: "G-5YZ4F4SK91"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const functions = firebase.functions();
const storage = firebase.storage();

export { auth, firestore, functions, storage, firebase as default }
