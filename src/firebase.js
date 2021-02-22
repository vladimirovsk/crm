import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIRBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIRBASE_URL,
    projectId: process.env.REACT_APP_FIRBASE_ID,
    storageBucket: process.env.REACT_APP_FIRBASE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIRBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIRBASE_API_APP_ID
  };

  const app = firebase.initializeApp(firebaseConfig);

  export const auth = app.auth();

  export default app;