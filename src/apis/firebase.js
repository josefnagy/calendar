import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVEmKeHryShoAlFPfYlk3gLZ87661nCSE",
  authDomain: "calendar-jb007c.firebaseapp.com",
  databaseURL:
    "https://calendar-jb007c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "calendar-jb007c",
  storageBucket: "calendar-jb007c.appspot.com",
  messagingSenderId: "843096284644",
  appId: "1:843096284644:web:95f620afb53fd3b418fbf1",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
