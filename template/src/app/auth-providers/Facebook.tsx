import {useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {useAlerts} from 'react-native-paper-alerts';

import {UserContext} from '../App';
import {useAppSettings} from '../components/AppSettings';
import ProviderButton from '../components/AuthProviderButton';
import {getProviderButtonTitle} from '../util/helpers';

const PROVIDER_ID = 'facebook.com';

function Facebook(): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const Alert = useAlerts();
  const appSettings = useAppSettings();

  const {isOnlyProvider, title, variant} = getProviderButtonTitle(
    user,
    PROVIDER_ID,
  );

  async function handleFacebook() {
    if (!loading) {
      setLoading(true);

      try {
        if (variant === 'UNLINK' && user) {
          await user.unlink(PROVIDER_ID);
          await user.reload();
        } else {
          const {isCancelled} = await LoginManager.logInWithPermissions([
            'public_profile',
            'email',
          ]);

          if (isCancelled) {
            Alert.alert(
              appSettings.t('facebookAuthError'),
              appSettings.t('facebookAuthCancelled'),
              [{text: appSettings.t('OK')}],
            );
          } else {
            const result = await AccessToken.getCurrentAccessToken();
            if (!result) {
              throw new Error(appSettings.t('facebookAuthErrorMessage'));
            }

            const {accessToken} = result;

            const credential =
              auth.FacebookAuthProvider.credential(accessToken);

            if (variant === 'LINK' && user) {
              await user.linkWithCredential(credential);
              await user.reload();
            } else if (variant === 'SIGN_IN') {
              await auth().signInWithCredential(credential);
            }
          }
        }
      } catch (error) {
        setLoading(false);
        // TODO catalog error messages and translate. Passing raw now
        Alert.alert(
          appSettings.t('facebookAuthError'),
          (error as Error).message,
          [{text: appSettings.t('OK')}],
        );
      }
    }
  }

  if (isOnlyProvider) {
    return null;
  }

  return (
    <ProviderButton loading={loading} type="facebook" onPress={handleFacebook}>
      {title}
    </ProviderButton>
  );
}

export default Facebook;
