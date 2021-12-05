/// <reference types="react-scripts" />
import {UserCredential} from 'firebase/auth';

declare module '@react-native-firebase/auth' {
  export const googleWebSignIn: () => Promise<UserCredential>;
  export const facebookWebSignIn: () => Promise<UserCredential>;
  export const signOutWeb: () => Promise<void>;
}
