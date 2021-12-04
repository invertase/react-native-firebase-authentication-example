import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

import initializeApp from './firebase-init';
initializeApp();

const auth = firebase.auth;

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const googleWebSignInWithPopup = async () =>
  await signInWithPopup(auth(), provider);
export const googleWebSignInWithRedirect = async () =>
  await signInWithRedirect(auth(), provider);
export const googleWebSignOut = async () => await signOut(auth());

export default auth;
