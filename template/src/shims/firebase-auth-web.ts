import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {isMobile} from 'react-device-detect';

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

const googleWebSignInWithPopup = async () =>
  await signInWithPopup(auth(), provider);
const googleWebSignInWithRedirect = async () =>
  await signInWithRedirect(auth(), provider);

export const googleWebSignIn = async () =>
  isMobile
    ? await googleWebSignInWithRedirect()
    : await googleWebSignInWithPopup();

export const googleWebSignOut = async () => await signOut(auth());

// Want to do local development?
// Uncomment this and use `yarn test:emulator:start`
// auth().useEmulator('http://localhost:9099');

export default auth;
