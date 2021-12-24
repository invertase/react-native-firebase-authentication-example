import {useContext, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {FirebaseError} from '@firebase/util';
import auth from '@react-native-firebase/auth';
import appleAuth, {
  AppleButton,
  AppleRequestOperation,
  AppleRequestScope,
} from '@invertase/react-native-apple-authentication';
import {useAlerts} from 'react-native-paper-alerts';

import {UserContext} from '../App';
import {useAppSettings} from '../components/AppSettings';
import {getProviderButtonTitle} from '../util/helpers';

const PROVIDER_ID = 'apple.com';

function Apple(): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const Alert = useAlerts();
  const appSettings = useAppSettings();

  if (Platform.OS !== 'ios') {
    return null;
  }

  const {isOnlyProvider, variant} = getProviderButtonTitle(user, PROVIDER_ID);

  async function handleApple() {
    if (!loading) {
      setLoading(true);

      try {
        if (variant === 'UNLINK' && user) {
          await user.unlink(PROVIDER_ID);
          await user.reload();
        } else {
          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: AppleRequestOperation.LOGIN,
            requestedScopes: [
              AppleRequestScope.EMAIL,
              AppleRequestScope.FULL_NAME,
            ],
          });

          const {identityToken, nonce} = appleAuthRequestResponse;
          if (identityToken) {
            const credential = auth.AppleAuthProvider.credential(
              identityToken,
              nonce,
            );

            if (variant === 'LINK' && user) {
              await user.linkWithCredential(credential);
              await user.reload();
            } else if (variant === 'SIGN_IN') {
              await auth().signInWithCredential(credential);
            }
          } else {
            Alert.alert(
              appSettings.t('appleAuthErrorTitle'),
              appSettings.t('appleAuthErrorMessage'),
              [{text: appSettings.t('OK')}],
            );
          }
        }
      } catch (e) {
        setLoading(false);
        const error = e as FirebaseError;
        if (error.code !== '1001') {
          // TODO: translate all possible cases - just sending through raw now
          Alert.alert(appSettings.t('appleAuthErrorTitle'), error.message, [
            {text: appSettings.t('OK')},
          ]);
        }
      }
    }
  }

  if (isOnlyProvider) {
    return null;
  }

  return (
    <AppleButton
      style={styles.appleButton}
      cornerRadius={5}
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      onPress={() => handleApple()}
    />
  );
}

const styles = StyleSheet.create({
  appleButton: {
    width: 300,
    height: 35,
    margin: 6,
  },
});

export default Apple;
