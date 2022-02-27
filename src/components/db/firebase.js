import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({

});

const DB = firebaseApp.firestore();

export default DB;
