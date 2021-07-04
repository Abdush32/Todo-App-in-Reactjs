import firebase from "firebase";

const firebaseApp = firebase.initializeApp  ({
// ENTER YOUR FIREBASE  CONFIG
  });
  const db = firebaseApp.firestore();
  export default db;
