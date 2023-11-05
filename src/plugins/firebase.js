import { initializeApp } from "firebase/app";
import { VueFire, VueFireAuth } from 'vuefire';

const firebaseConfig={
  apiKey: "AIzaSyA7cXAzt0C9aW2pd41IqC-K9DedrKenMzs",
  authDomain: "illegal-move.firebaseapp.com",
  projectId: "illegal-move",
  storageBucket: "illegal-move.appspot.com",
  messagingSenderId: "470151067701",
  appId: "1:470151067701:web:62298f8191cfcab6a9197c",
  measurementId: "G-L1R730WX9E"
};

const firebaseApp=initializeApp(firebaseConfig);

const firebasePlugin={
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
};

const firebase={
  install: (app) => {
    app.use(VueFire, firebasePlugin);
  }
};

export default firebase;
