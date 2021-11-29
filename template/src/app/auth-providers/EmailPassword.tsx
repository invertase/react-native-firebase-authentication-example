import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {handleAuthError} from '../util/helpers';
import {useAppSettings} from '../AppSettings';

function EmailPassword(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();
  const appSettings = useAppSettings();

  useEffect(() => {
    if (error) {
      Alert.alert(appSettings.t('signInError'), error);
    }
  }, [error, appSettings]);

  async function attemptSignIn() {
    if (!email || !password) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      setLoading(false);
      handleAuthError(e as FirebaseAuthTypes.PhoneAuthError, setError);
    }
  }

  const styles = StyleSheet.create({
    signinButton: {
      alignSelf: 'center',
      backgroundColor: theme.colors.primary,
      width: 300,
    },
    icon: {
      alignSelf: 'center',
      padding: 10,
      width: 65,
      height: 65,
    },
    form: {
      flex: 1,
      padding: 20,
      textAlign: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    button: {
      marginVertical: 20,
    },
  });

  const maskTheme = {
    ...theme,
    colors: {
      background: 'transparent',
      primary: theme.colors.text,
    },
  };

  return (
    <View style={styles.form}>
      <Image
        style={styles.icon}
        source={{
          uri: 'https://storage.googleapis.com/static.invertase.io/assets/React-Native-Firebase.png',
        }}
      />
      <TextInput
        value={email}
        label={appSettings.t('emailLabel')}
        theme={maskTheme}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        autoComplete="email"
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry
        value={password}
        label={appSettings.t('passwordLabel')}
        theme={maskTheme}
        onChangeText={setPassword}
        autoComplete="password"
      />
      <Button
        disabled={loading || !email || !password}
        style={[styles.button, styles.signinButton]}
        icon="lock"
        mode={loading ? 'text' : 'contained'}
        onPress={() => (loading ? null : attemptSignIn())}
        // theme={maskTheme}
        loading={loading}>
        {loading
          ? appSettings.t('signInSigningIn')
          : appSettings.t('signInSignIn')}
      </Button>
    </View>
  );
}

export default EmailPassword;
