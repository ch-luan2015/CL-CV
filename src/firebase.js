import firebase from "firebase/app";
import database from "firebase/database";



const config = {
    apiKey: "AIzaSyAchFAZua_n64MblMmppie1hRFeC7UsL7M",
    authDomain: "clblog123-a057e.firebaseapp.com",
    databaseURL: "https://clblog123-a057e.firebaseio.com",
    projectId: "clblog123-a057e",
    storageBucket: "clblog123-a057e.appspot.com",
    messagingSenderId: "471058302854",
    appId: "1:471058302854:web:98e6eaefd1d5092d8c4e07"
  };


  let firebaseCache;

  export const getFirebase = () => {
    if (firebaseCache) {

      return firebaseCache;
    }
  
    firebase.initializeApp(config);
    firebaseCache = firebase;
    return firebase;
  };
