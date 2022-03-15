import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
// import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyAAaEr9CrdZCADDRyIm_sz3oT7H1pidsv4",
  authDomain: "journal-app-react-f16eb.firebaseapp.com",
  projectId: "journal-app-react-f16eb",
  storageBucket: "journal-app-react-f16eb.appspot.com",
  messagingSenderId: "739979174675",
  appId: "1:739979174675:web:6cb5d90eacdb8e82a270e6"
};


firebase.initializeApp(firebaseConfig);                                     // ==>base de datos

const db = firebase.firestore()                                             // ==> referencia a firestore
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()           // ==> auth provider para poder hacer autenticacion de google
 

export{
    db,
    googleAuthProvider,
    firebase
}












/*
firebaseConfig  ==> proporcionado por firebase en la página una vez se siguen los pasos para crear el proyecto alli. 


*/