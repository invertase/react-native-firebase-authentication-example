import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Button, Paragraph, TextInput, useTheme} from 'react-native-paper';
import {useLinkTo} from '@react-navigation/native';
import {useAlerts} from 'react-native-paper-alerts';

import {useAppSettings} from '../components/AppSettings';

function ForgotPassword(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const theme = useTheme();
  const appSettings = useAppSettings();
  const Alert = useAlerts();
  const linkTo = useLinkTo();

  async function attemptReset() {
    if (!email) {
      return;
    }

    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        appSettings.t('change-password-email'),
        appSettings.t('change-password-email-message'),
        [
          {
            text: appSettings.t('OK'),
            onPress: () => linkTo('/'),
          },
        ],
      );
    } catch (e) {
      const error = e as FirebaseAuthTypes.PhoneAuthError;
      Alert.alert(
        appSettings.t('forgotPasswordError'),
        appSettings.t(error.code ?? 'unknownError'),
        [{text: appSettings.t('OK')}],
      );
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
