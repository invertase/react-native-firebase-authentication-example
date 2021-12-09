import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import initializeApp from './firebase-init';
initializeApp();

const firestore = firebase.firestore;
export default firestore;
