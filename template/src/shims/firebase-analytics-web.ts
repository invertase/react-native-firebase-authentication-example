import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';

import initializeApp from './firebase-init';
initializeApp();

const analytics = firebase.analytics;
export default analytics;
