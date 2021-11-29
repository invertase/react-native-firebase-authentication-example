import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Paragraph, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {darkTheme} from '../theme';
import {handleAuthError} from '../util/helpers';

function ForgotPassword(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (error) {
      Alert.alert('Forgot Password - Error', error);
    }
    if (success) {
      Alert.alert('Check your email for password reset instructions');
      setSuccess(false);
      // @ts-ignore
      navigation.navigate('SignIn');
    }
  }, [error, success, navigation]);

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
    <View style={{backgroundColor: darkTheme.colors.background}}>
      <Paragraph>
        Enter your email address below to send a password reset email:
      </Paragraph>
      <TextInput
        autoFocus={true}
        value={email}
        autoCapitalize={'none'}
        style={styles.input}
        mode="outlined"
        label="Email Address"
        onChangeText={setEmail}
        autoComplete="email"
      />
      <Button
        loading={loading}
        onPress={() => (loading ? null : attemptReset())}>
        {loading ? 'Sending Password Reset' : 'Send Password Reset'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
});

export default ForgotPassword;
