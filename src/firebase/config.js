import firebase from 'firebase/app';
import 'firebase/firestore';

//turniejgalaktyczny@gmail.com
//const firebaseConfig = {
//  apiKey: "AIzaSyD4F9Co3z58-v0xIcMl_MJQ_1-dyf5FQ48",
//  authDomain: "turniej-galaktyczny.firebaseapp.com",
//  projectId: "turniej-galaktyczny",
//  storageBucket: "turniej-galaktyczny.appspot.com",
//  messagingSenderId: "594420839285",
//  appId: "1:594420839285:web:e633343beb4a6a38d0193c"
//};

const firebaseConfig = {
  apiKey: "AIzaSyDdfo2zhLIljBKK6CtADsyrCkFdgFu-dKo",
  authDomain: "turniej-galaktyczny-zabka.firebaseapp.com",
  projectId: "turniej-galaktyczny-zabka",
  storageBucket: "turniej-galaktyczny-zabka.appspot.com",
  messagingSenderId: "125047043563",
  appId: "1:125047043563:web:2433e58fb0bfd9036615ae"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
