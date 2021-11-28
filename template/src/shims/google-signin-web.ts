// import type {
//   // AddScopesParams,
//   SignInParams,
//   ConfigureParams,
//   HasPlayServicesParams,
//   User
// } from '../../node_modules/@react-native-google-signin/google-signin/src/types';

class GoogleSigninImpl {
  constructor() {
    console.log('GoogleSignin loaded in web mode.');
  }

  async signIn(): Promise<{}> {
    console.log('should do a google signin');
    return {};
  }

  async hasPlayServices(): Promise<boolean> {
    console.log('should check play services');
    return false;
  }

  async getTokens(): Promise<{idToken: string; accessToken: string}> {
    return {
      idToken: 'badidtoken',
      accessToken: 'badaccesstoken',
    };
  }

  configure(options: {}): void {
    console.log(
      'should configure google signin with options: ' + JSON.stringify(options),
    );
  }

  signOut(): void {
    console.log('should signout google');
  }
}

export const GoogleSignin = new GoogleSigninImpl();

export const statusCodes = {
  SIGN_IN_CANCELLED: 12501, // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInStatusCodes#public-static-final-int-sign_in_cancelled
  IN_PROGRESS: 'ASYNC_OP_IN_PROGRESS',
  PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  SIGN_IN_REQUIRED: 4, // https://developers.google.com/android/reference/com/google/android/gms/common/api/CommonStatusCodes#public-static-final-int-sign_in_required
};

export {};
