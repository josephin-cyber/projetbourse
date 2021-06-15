import * as firebase from "firebase";
import "@firebase/auth";

// src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"

const firebaseConfig = {
    apiKey: "AIzaSyDn9LSJFJJI8hBM32O5MavfRwYGacRyH1c",
    authDomain: "projetbourse.firebaseapp.com",
    projectId: "projetbourse",
    storageBucket: "projetbourse.appspot.com",
    messagingSenderId: "331170571375",
    appId: "1:331170571375:web:175226c8e3bbfb5dc2d99a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
