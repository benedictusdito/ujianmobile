import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBQrqyblps0MRr_RHzUuZ-bbSNg1D4AIsY",
  authDomain: "jc9benmobileapp.firebaseapp.com",
  databaseURL: "https://jc9benmobileapp.firebaseio.com",
  projectId: "jc9benmobileapp",
  storageBucket: "",
  messagingSenderId: "456839523771",
  appId: "1:456839523771:web:027977bc0d7c8f79"
};

export default (Fire = firebase.initializeApp(firebaseConfig));
