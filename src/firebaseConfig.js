import firebase from "firebase";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD5ZSZXArD2OumLHX-woMiZ7UUHiCiHDw8",
    authDomain: "timeclock-da831.firebaseapp.com",
    databaseURL: "https://timeclock-da831-default-rtdb.firebaseio.com",
    projectId: "timeclock-da831",
    storageBucket: "timeclock-da831.appspot.com",
    messagingSenderId: "1086147085929",
    appId: "1:1086147085929:web:081faed1164ab46b6844f8",
    measurementId: "G-VHVNXDJTBX"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;