import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDI0S0UAPPL-xnCLBKe4NN-DZHPq7gMqWY',
  authDomain: 'instagram-aca57.firebaseapp.com',
  projectId: 'instagram-aca57',
  storageBucket: 'instagram-aca57.appspot.com',
  messagingSenderId: '977574095264',
  appId: '1:977574095264:web:7f233dcefc54b528df5cc5',
};
console.log(REACT_APP_FIREBASE_apiKey);
console.log(REACT_APP_FIREBASE_authDomain);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
