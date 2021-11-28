import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {handleAuthError} from '../util/helpers';

function EmailPassword(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      Alert.alert('Sign In - Error', error);
    }
  }, [error]);

  async function attemptSignIn() {
    if (!email || !password) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      handleAuthError(e as FirebaseAuthTypes.PhoneAuthError, setError);
    } finally {
      setLoading(false);
    }
  }

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
        label="Email Address"
        underlineColor="#fff"
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
        label="Password"
        underlineColor="#fff"
        theme={maskTheme}
        onChangeText={setPassword}
        autoComplete="password"
      />
      <Button
        style={styles.button}
        icon="lock"
        mode={loading ? 'text' : 'outlined'}
        onPress={() => (loading ? null : attemptSignIn())}
        theme={maskTheme}
        loading={loading}>
        {loading ? 'Signing In' : 'Sign In'}
      </Button>
    </View>
  );
}

const maskTheme = {
  dark: true,
  colors: {
    text: '#fff',
    primary: '#fff',
    background: 'transparent',
    placeholder: '#fff',
  },
};

const styles = StyleSheet.create({
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

export default EmailPassword;
