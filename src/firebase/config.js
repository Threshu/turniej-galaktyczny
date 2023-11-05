import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4F9Co3z58-v0xIcMl_MJQ_1-dyf5FQ48",
  authDomain: "turniej-galaktyczny.firebaseapp.com",
  projectId: "turniej-galaktyczny",
  storageBucket: "turniej-galaktyczny.appspot.com",
  messagingSenderId: "594420839285",
  appId: "1:594420839285:web:e633343beb4a6a38d0193c"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
