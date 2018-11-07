import firebase from 'firebase'
// Required for side-effects
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyAy-rLBRYrIatm9R8C09k4Ii_xd5vLSNqk",
  authDomain: "mythings-1529491115692.firebaseapp.com",
  databaseURL: "https://mythings-1529491115692.firebaseio.com",
  projectId: "mythings-1529491115692",
  storageBucket: "mythings-1529491115692.appspot.com",
  messagingSenderId: "314851812765"
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
export { firebase, db};