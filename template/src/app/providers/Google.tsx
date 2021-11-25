import auth from '@react-native-firebase/auth';
import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {FirebaseError} from '@firebase/util';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {UserContext} from '../App';
import ProviderButton from '../components/ProviderButton';
import {getProviderButtonTitle} from '../util/helpers';

const PROVIDER_ID = 'google.com';

function Google(): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const {isOnlyProvider, title, variant} = getProviderButtonTitle(user, PROVIDER_ID);

  async function handleGoogle() {
    if (!loading) {
      setLoading(true);

      try {
        await GoogleSignin.hasPlayServices();

        if (variant === 'UNLINK' && user) {
          await user.unlink(PROVIDER_ID);
        } else {
          await GoogleSignin.signIn();
          const {accessToken, idToken} = await GoogleSignin.getTokens();
          const credential = auth.GoogleAuthProvider.credential(idToken, accessToken);

          if (variant === 'LINK' && user) {
            await user.linkWithCredential(credential);
          } else if (variant === 'SIGN_IN') {
            await auth().signInWithCredential(credential);
          }
        }
      } catch (e) {
        const error = e as FirebaseError;
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
          case '-1':
            return Alert.alert('Google Auth Canceled');
          case statusCodes.IN_PROGRESS:
            return Alert.alert('Google Auth Already In Progress');
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            return Alert.alert('Google Auth Requires Play Services');
          default:
            switch (error.message) {
              case 'DEVELOPER_ERROR':
                console.info(
                  'Developer error during Google Auth, check: ' +
                    'https://github.com/react-native-community/react-native-google-signin/blob/f21dd95a090f4f529748473e20515d6fc66db6bb/example/README.md#developer_error-or-code-10-on-android'
                );
                return Alert.alert(
                  'Google Auth Error',
                  // eslint-disable-next-line max-len
                  'Google Auth has not been configured correctly for this app by the developer. More info is available in the console output.'
                );
              default:
                return Alert.alert('Google Auth Error', error.message);
            }
        }
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      // TODO: Get your web client id from firebase console --> Project Settings --> Auth --> Google Sign-in
      webClientId: require('../../config.json').webClientId
    });
  }, []);

  if (isOnlyProvider) {
    return null;
  }

  return (
    <ProviderButton loading={loading} onPress={handleGoogle} type='google'>
      {title}
    </ProviderButton>
  );
}

export default Google;
