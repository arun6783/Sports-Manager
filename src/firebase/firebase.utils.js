import firebase from 'firebase/app'

import 'firebase/firestore';

import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA14r1m9ZRKUA1ozgUXOZlAMVTxFJey_YU",
    authDomain: "sports-mgr.firebaseapp.com",
    databaseURL: "https://sports-mgr.firebaseio.com",
    projectId: "sports-mgr",
    storageBucket: "sports-mgr.appspot.com",
    messagingSenderId: "9768371556",
    appId: "1:9768371556:web:8a7f6c1d412f618814a671",
    measurementId: "G-PQ6MH92QX5"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;