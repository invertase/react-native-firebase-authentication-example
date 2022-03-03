import {AccessToken} from 'react-native-fbsdk-next';

export class LoginManager {
  async getCurrentAccessToken(): Promise<AccessToken | null> {
    console.log('facebook trying to get current access token');
    return null;
  }
  logOut(): void {
    console.log('facebook trying to logOut');
    return;
  }
}
