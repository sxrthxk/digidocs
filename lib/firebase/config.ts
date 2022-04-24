import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCw8g3oFEYTeCC0bJduidUs7s2PbxkTuOE",
  authDomain: "digidocs-5b030.firebaseapp.com",
  projectId: "digidocs-5b030",
  storageBucket: "digidocs-5b030.appspot.com",
  messagingSenderId: "145289862443",
  appId: "1:145289862443:web:65c29fcd26c9d6f509396e",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app)
const firestore = getFirestore(app)

export { app, auth, storage, firestore };
