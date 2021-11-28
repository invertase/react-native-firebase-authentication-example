import {FirebaseError} from '@firebase/util';
import auth from '@react-native-firebase/auth';
import React, {useContext, useState} from 'react';
import {Alert, Platform, StyleSheet} from 'react-native';
import appleAuth, {
  AppleButton,
  AppleRequestOperation,
  AppleRequestScope,
} from '@invertase/react-native-apple-authentication';
import {UserContext} from '../App';
import {getProviderButtonTitle} from '../util/helpers';

const PROVIDER_ID = 'apple.com';

function Apple(): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);

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
            } else if (variant === 'SIGN_IN') {
              await auth().signInWithCredential(credential);
            }
          } else {
            Alert.alert(
              'Apple Auth Error',
              'Unable to obtain an identity token from Apple.',
            );
          }
        }
      } catch (e) {
        const error = e as FirebaseError;
        // TODO: handle possible cases
        if (error.code !== '1001') {
          Alert.alert('Apple Auth Error', error.message);
        }
      } finally {
        setLoading(false);
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
