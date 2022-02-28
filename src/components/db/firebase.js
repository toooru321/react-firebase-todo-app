import {initializeApp} from "firebase/firebaseApp"
import {getFirestore} from "firebase/firestore/lite"
FirebaseConfig({
    apiKey: "AIzaSyCkpv86RJP0Rj65N6yZagydPfdhGgRP3X8",
    authDomain: "react-plactice-25dbb.firebaseapp.com",
    projectId: "react-plactice-25dbb",
    storageBucket: "react-plactice-25dbb.appspot.com",
    messagingSenderId: "845642218300",
    appId: "1:845642218300:web:7307bcf2962a1f9e59bc39"
});

const app =initializeApp(FirebaseConfig)
const db=getFirestore(app)

export default db;
