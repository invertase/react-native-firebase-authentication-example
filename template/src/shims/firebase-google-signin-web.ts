import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup as signInWithPopupFirebase,
  signOut as signOutFirebase,
} from 'firebase/auth';

import initializeApp from './firebase-init';
initializeApp();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
const auth = getAuth();
export const signInWithPopup = async () =>
  await signInWithPopupFirebase(auth, provider);
export const signOutGoogle = async () => await signOutFirebase(auth);
