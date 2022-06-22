// Conveniently import this file anywhere to use db

import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBCDfaY0yJyIowRobY7k9Y3lMuEnLcWbzY",
    authDomain: "ecommercespa-e35c7.firebaseapp.com",
    projectId: "ecommercespa-e35c7",
    storageBucket: "ecommercespa-e35c7.appspot.com",
    messagingSenderId: "505976699620",
    appId: "1:505976699620:web:b343b8d7e8d8ad5d26caf1"
  };

// Initialize Firebase
export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore()

// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }

// Your web app's Firebase configuration
