import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {
  Button,
  HelperText,
  Paragraph,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {handleAuthError} from '../util/helpers';
import {useAppSettings} from '../AppSettings';

function CreateAccount(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');

  const [help, setHelp] = useState<string>('');
  const [error, setError] = useState<string>('');
  const theme = useTheme();
  const appSettings = useAppSettings();

  useEffect(() => {
    if (error) {
      Alert.alert(appSettings.t('createAccountError'), error);
      setError('');
    }
  }, [error, appSettings]);

  useEffect(() => {
    if (password === confirm) {
      setHelp('');
    } else if (password && confirm && password !== confirm) {
      setHelp(appSettings.t('passwordsDoNotMatch'));
    }
  }, [password, confirm, appSettings]);

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
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Paragraph>{appSettings.t('createAccountInstructions')}</Paragraph>
      <TextInput
        style={styles.input}
        mode="outlined"
        label={appSettings.t('emailLabel')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        autoFocus={true}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        mode="outlined"
        label={appSettings.t('passwordLabel')}
        value={password}
        onChangeText={setPassword}
        autoComplete="password"
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        mode="outlined"
        label={appSettings.t('createAccountPasswordConfirmLabel')}
        value={confirm}
        onChangeText={setConfirm}
        autoComplete="password"
      />
      <HelperText type="error" visible={!!help}>
        {help}
      </HelperText>
      <Button
        loading={loading}
        mode="contained"
        disabled={!email || !password || !confirm || !!help}
        onPress={() => (loading ? null : handleCreate())}>
        {loading
          ? appSettings.t('createAccountCreationg')
          : appSettings.t('createAccountCreate')}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginVertical: 10,
  },
});

export default CreateAccount;
