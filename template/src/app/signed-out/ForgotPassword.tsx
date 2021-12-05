import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Paragraph, TextInput, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {handleAuthError} from '../util/helpers';
import {useAppSettings} from '../components/AppSettings';

function ForgotPassword(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const appSettings = useAppSettings();

  useEffect(() => {
    if (error) {
      Alert.alert(appSettings.t('forgotPasswordError'), error);
      setError('');
    }
    if (success) {
      Alert.alert(appSettings.t('forgotPasswordSuccess'));
      setSuccess(false);
      // @ts-ignore
      navigation.navigate('SignIn');
    }
  }, [error, success, navigation, appSettings]);

  async function attemptReset() {
    if (!email) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await auth().sendPasswordResetEmail(email);
      setSuccess(true);
    } catch (e) {
      handleAuthError(e as FirebaseAuthTypes.PhoneAuthError, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Paragraph>{appSettings.t('forgotPasswordInstructions')}</Paragraph>
      <TextInput
        autoFocus={true}
        value={email}
        autoCapitalize={'none'}
        style={styles.input}
        mode="outlined"
        label={appSettings.t('forgotPasswordLabel')}
        onChangeText={setEmail}
        autoComplete="email"
      />
      <Button
        disabled={!email}
        loading={loading}
        mode="contained"
        onPress={() => (loading ? null : attemptReset())}>
        {loading
          ? appSettings.t('forgotPasswordSending')
          : appSettings.t('forgotPasswordSend')}
      </Button>
    </View>
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

export default ForgotPassword;
