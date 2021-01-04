import {firebase} from '@firebase/app';

require("@firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBJrPFDrXJcOLmWUo6tAEZWQVQA5VcDjcM",
  authDomain: "story-hub-app-1c9f5.firebaseapp.com",
  projectId: "story-hub-app-1c9f5",
  storageBucket: "story-hub-app-1c9f5.appspot.com",
  messagingSenderId: "1098332566920",
  appId: "1:1098332566920:web:3de36b2b52edc58eb0f63d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
