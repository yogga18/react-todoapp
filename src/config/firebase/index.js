import firebase from 'firebase';
// import'firebase/firestore';
// import'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAzKyTOeVvxL2kJ6VbV6XRBZWzFC3H3H7g",
    authDomain: "todoapp-b8d12.firebaseapp.com",
    projectId: "todoapp-b8d12",
    storageBucket: "todoapp-b8d12.appspot.com",
    messagingSenderId: "60556873168",
    appId: "1:60556873168:web:cafa3af5fae1c9af9cfdd5",
    measurementId: "G-9R8GXHQVR6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service
  export const database = firebase.database();

  export default firebase;