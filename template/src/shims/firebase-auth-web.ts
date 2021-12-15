import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import initializeApp from './firebase-init';
initializeApp();

const auth = firebase.auth;

// Want to do local development?
// Uncomment this and use `yarn test:emulator:start`
// auth().useEmulator('http://localhost:9099');

export default auth;
