import firebase from 'firebase/compat/app';

import initializeApp from './firebase-init';
initializeApp();

const app = firebase.app();
export default app;
