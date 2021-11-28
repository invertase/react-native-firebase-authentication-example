import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {Button, HelperText, Paragraph, TextInput} from 'react-native-paper';
import {handleAuthError} from '../util/helpers';

function CreateAccount(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');

  const [help, setHelp] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (error) {
      Alert.alert('Create Account - Error', error);
    }
  }, [error]);

  useEffect(() => {
    if (password === confirm) {
      setHelp('');
    } else if (password && confirm && password !== confirm) {
      setHelp('Passwords do not match.');
    }
  }, [password, confirm]);

  async function handleCreate() {
    try {
      setLoading(true);
      setError('');
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      handleAuthError(e as FirebaseAuthTypes.PhoneAuthError, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Paragraph>
        Create an account with your email and password. Once created you will be
        automatically logged in to your profile:
      </Paragraph>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        theme={inputTheme}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        theme={inputTheme}
        autoComplete="password"
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        mode="outlined"
        label="Confirm Password"
        value={confirm}
        onChangeText={setConfirm}
        theme={inputTheme}
        autoComplete="password"
      />
      <HelperText type="error" visible={!!help}>
        {help}
      </HelperText>
      <Button
        loading={loading}
        disabled={!email || !password || !confirm || !!help}
        onPress={() => (loading ? null : handleCreate())}>
        {loading ? 'Creating Account' : 'Create Account'}
      </Button>
    </ScrollView>
  );
}

const inputTheme = {
  colors: {
    background: '#fff',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    marginVertical: 10,
  },
});

export default CreateAccount;
