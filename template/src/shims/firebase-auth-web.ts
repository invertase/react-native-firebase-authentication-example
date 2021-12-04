import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

import initializeApp from './firebase-init';
initializeApp();

const auth = firebase.auth;
const firebaseAuth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const googleWebSignInWithPopup = async () =>
  await signInWithPopup(firebaseAuth, provider);
export const googleWebSignInWithRedirect = async () =>
  await signInWithRedirect(firebaseAuth, provider);
export const googleWebSignOut = async () => await signOut(firebaseAuth);

export default auth;
