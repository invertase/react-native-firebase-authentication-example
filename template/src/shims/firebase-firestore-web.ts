import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import initializeApp from './firebase-init';
initializeApp();

const firestore = firebase.firestore;

// Want to do local development?
// Uncomment this and use `yarn test:emulator:start`
// firestore().useEmulator('http://localhost:8080');

export default firestore;
