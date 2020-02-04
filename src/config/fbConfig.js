import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAJvMDK5DHjwndKqoR3R7C0JgD_vgeAs30",
    authDomain: "rdx-todolist.firebaseapp.com",
    databaseURL: "https://rdx-todolist.firebaseio.com",
    projectId: "rdx-todolist",
    storageBucket: "rdx-todolist.appspot.com",
    messagingSenderId: "837186190989",
    appId: "1:837186190989:web:233d2add385c63a8dfacc4",
    measurementId: "G-BTKEMQ3372"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
