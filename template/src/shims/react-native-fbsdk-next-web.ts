import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';
import {LoginResult} from 'react-native-fbsdk-next/types/FBLoginManager';

export class AccessToken {
  async logInWithPermissions(): Promise<LoginResult> {
    console.log('facebook trying to login');
    return {isCancelled: true};
  }
}

export class LoginManager {
  async getCurrentAccessToken(): Promise<FBAccessToken | null> {
    console.log('facebook trying to get current access token');
    return null;
  }
  logOut(): void {
    console.log('facebook trying to logOut');
    return;
  }
}
