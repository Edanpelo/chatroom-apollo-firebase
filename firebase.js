// import * as firebase from 'firebase'


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDZQ_OQHfIq8l_XSTnBocDsrqz_HD3Bvyo",
//   authDomain: "focus-vertex-304918.firebaseapp.com",
//   projectId: "focus-vertex-304918",
//   storageBucket: "focus-vertex-304918.appspot.com",
//   messagingSenderId: "1060749167004",
//   appId: "1:1060749167004:web:b08c91eb9514a8fd4e6059"
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = firebase.firestore()
// const auth = firebase.auth()
// export {db, auth}

// Import the functions you need from the SDKs you need
import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZQ_OQHfIq8l_XSTnBocDsrqz_HD3Bvyo",
  authDomain: "focus-vertex-304918.firebaseapp.com",
  projectId: "focus-vertex-304918",
  storageBucket: "focus-vertex-304918.appspot.com",
  messagingSenderId: "1060749167004",
  appId: "1:1060749167004:web:b08c91eb9514a8fd4e6059"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth};