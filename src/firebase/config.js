// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsWAFXLFANml9tKU4yVW9rXG1GVdRa_64",
  authDomain: "netflix-clone-33dba.firebaseapp.com",
  projectId: "netflix-clone-33dba",
  storageBucket: "netflix-clone-33dba.appspot.com",
  messagingSenderId: "25016474475",
  appId: "1:25016474475:web:fe09893e8714598da00a2e"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig)
export const firestore=getFirestore()