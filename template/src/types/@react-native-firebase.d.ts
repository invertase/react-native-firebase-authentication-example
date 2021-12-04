import {UserCredential} from 'firebase/auth';

declare module '@react-native-firebase/auth' {
  export const googleWebSignIn: () => Promise<UserCredential>;
  export const googleWebSignOut: () => Promise<void>;
}
