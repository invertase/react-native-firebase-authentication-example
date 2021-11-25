import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import initializeApp from './firebase-init';
initializeApp();

const auth = firebase.auth;
export default auth;
