import auth from '@react-native-firebase/auth';
import {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {UserContext} from '../App';
import ProviderButton from '../components/AuthProviderButton';
import {getProviderButtonTitle} from '../util/helpers';

const PROVIDER_ID = 'facebook.com';

function Facebook(): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);

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
            Alert.alert('Facebook Auth Canceled');
          } else {
            const result = await AccessToken.getCurrentAccessToken();
            if (!result) {
              throw new Error(
                'No Access Token was returned from Facebook SDK.',
              );
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
        Alert.alert('Facebook Auth Error', (error as Error).message);
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
