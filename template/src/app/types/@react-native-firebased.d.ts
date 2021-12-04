import {UserCredential} from 'firebase/auth';

declare module '@react-native-firebase/auth' {
  export const googleWebSignInWithPopup: () => Promise<UserCredential>;
  export const googleWebSignInWithRedirect: () => Promise<UserCredential>;
  export const googleWebSignOut: () => Promise<void>;
}
