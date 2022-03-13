import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {isMobile} from 'react-device-detect';

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut as signOutFirebase,
} from 'firebase/auth';

import initializeApp from './firebase-init';
initializeApp();

const auth = firebase.auth;

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  display: 'popup',
});

const facebookWebSignInWithPopup = async () =>
  await signInWithPopup(auth(), facebookProvider);
const facebookWebSignInWithRedirect = async () =>
  await signInWithRedirect(auth(), facebookProvider);

export const facebookWebSignIn = async () =>
  isMobile
    ? await facebookWebSignInWithRedirect()
    : await facebookWebSignInWithPopup();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

const googleWebSignInWithPopup = async () =>
  await signInWithPopup(auth(), googleProvider);
const googleWebSignInWithRedirect = async () =>
  await signInWithRedirect(auth(), googleProvider);

export const googleWebSignIn = async () =>
  isMobile
    ? await googleWebSignInWithRedirect()
    : await googleWebSignInWithPopup();

export const signOutWeb = async () => await signOutFirebase(auth());

// Want to do local development?
// Uncomment this and use `yarn test:emulator:start`
// auth().useEmulator('http://localhost:9099');

export default auth;
