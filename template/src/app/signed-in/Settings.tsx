import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  Banner,
  Button,
  Divider,
  HelperText,
  Paragraph,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAlerts} from 'react-native-paper-alerts';

import {useAppSettings} from '../components/AppSettings';

function EditProfile(): JSX.Element | null {
  const user = auth().currentUser;
  const theme = useTheme();
  const appSettings = useAppSettings();
  const Alert = useAlerts();

  const [signingOut, setSigningOut] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [displayName, setDisplayName] = useState(
    user ? user.displayName || '' : '',
  );
  const [help, setHelp] = useState<string>('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updatingUser, setUpdatingUser] = useState(false);

  useEffect(() => {
    if (newPassword === confirmPassword) {
      setHelp('');
    } else if (
      newPassword &&
      confirmPassword &&
      newPassword !== confirmPassword
    ) {
      setHelp(appSettings.t('passwordsDoNotMatch'));
    }
  }, [newPassword, confirmPassword, appSettings]);

  async function signOut() {
    setSigningOut(true);
    await GoogleSignin.signOut();
    await auth().signOut();
  }

  async function handleDisplayName() {
    if (!user) {
      return;
    }

    if (!savingName) {
      try {
        setSavingName(true);
        await user.updateProfile({
          displayName,
        });
        Alert.alert(
          appSettings.t('userNameDisplayUpdatedTitle'),
          appSettings.t('userNameDisplayUpdateMessage'),
          [{text: appSettings.t('OK')}],
        );
        await user.reload();
      } catch (e) {
        Alert.alert(appSettings.t('userUpdateError'), (e as Error).message, [
          {text: appSettings.t('OK')},
        ]);
      } finally {
        setSavingName(false);
      }
    }
  }

  async function updateEmailVerifyStatus() {
    if (!user || updatingUser) {
      return;
    }

    // we will assume success, and only change text on fail or error
    let dialogText = appSettings.t('userEmailVerificationSuccess');
    try {
      setUpdatingUser(true);

      await user.reload();
      if (!auth().currentUser?.emailVerified) {
        dialogText = appSettings.t('userEmailVerificationFailure');
      }
    } catch (e) {
      dialogText =
        appSettings.t('userEmailVerificationFailure') +
        ': ' +
        (e as Error).message;
    } finally {
      Alert.alert(appSettings.t('userEmailVerifyTitle'), dialogText, [
        {
          text: appSettings.t('OK'),
        },
      ]);
      setUpdatingUser(false);
    }
  }

  async function handlePassword() {
    if (!user || !user.email) {
      return;
    }
    if (!savingPassword) {
      try {
        setSavingPassword(true);
        await auth().signInWithEmailAndPassword(user.email, currentPassword);
        await user.updatePassword(newPassword);
        Alert.alert(
          appSettings.t('change-password-successful'),
          appSettings.t('change-password-successful-message'),
          [
            {
              text: appSettings.t('OK'),
              // @ts-ignore FIXME type the navigator
              onPress: async () => await signOut(),
            },
          ],
        );
      } catch (e) {
        Alert.alert(
          appSettings.t('userUpdateError'),
          appSettings.t('change-password-error'),
          [{text: appSettings.t('OK')}],
        );
      } finally {
        setSavingPassword(false);
      }
    }
  }

  if (!user) {
    return null;
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Banner
        visible={!user.emailVerified}
        actions={[
          {
            label: appSettings.t('userEmailVerificationVerifyButton'),
            onPress: () => {
              updateEmailVerifyStatus();
            },
          },
          {
            label: appSettings.t('userEmailVerify'),
            onPress: () => {
              user
                .sendEmailVerification()
                .then(() =>
                  Alert.alert(
                    appSettings.t('userEmailVerification'),
                    appSettings.t('userEmailVerificationInstructions1') +
                      ' "' +
                      user.email +
                      '". ' +
                      appSettings.t('userEmailVerificationInstructions2') +
                      '.',
                    [{text: appSettings.t('OK')}],
                  ),
                );
            },
          },
        ]}
        icon={({size}) => (
          <Icon name="alert-decagram" size={size} color="#f44336" />
        )}>
        {appSettings.t('userEmailVerificationBanner')}
      </Banner>
      <View style={styles.content}>
        <Title>{appSettings.t('userNameDisplayLabel')}</Title>
        <Paragraph>{appSettings.t('userNameDisplayInstructions')}</Paragraph>
        <TextInput
          style={styles.input}
          mode="outlined"
          label={appSettings.t('userNameDisplayLabel')}
          value={displayName}
          onChangeText={setDisplayName}
          autoComplete="name"
        />
        <Button
          mode="contained"
          disabled={!displayName}
          loading={savingName}
          onPress={handleDisplayName}
          style={styles.button}>
          {appSettings.t('userNameDisplaySave')}
        </Button>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.content}>
        <Title>{appSettings.t('userPasswordUpdateLabel')}</Title>
        <Paragraph>{appSettings.t('userPasswordInstructions')}</Paragraph>
        <TextInput
          secureTextEntry
          style={styles.input}
          mode="outlined"
          label={appSettings.t('userPasswordCurrent')}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          autoComplete="password"
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          mode="outlined"
          label={appSettings.t('userPasswordNew')}
          value={newPassword}
          onChangeText={setNewPassword}
          autoComplete="password"
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          mode="outlined"
          label={appSettings.t('userPasswordConfirm')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoComplete="password"
        />
        <HelperText type="error" visible={!!help}>
          {help}
        </HelperText>
        <Button
          disabled={
            !currentPassword ||
            !newPassword ||
            !confirmPassword ||
            newPassword !== confirmPassword
          }
          mode="contained"
          style={styles.button}
          loading={savingPassword}
          onPress={handlePassword}>
          {appSettings.t('userPasswordUpdate')}
        </Button>
      </View>
      <Divider style={styles.divider} />
      <View style={[styles.content]}>
        <Button
          mode="contained"
          loading={signingOut}
          onPress={() => (signingOut ? null : signOut())}
          style={[styles.button, styles.maxWidth]}>
          {appSettings.t('userSignOut')}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maxWidth: {
    width: '100%',
  },
  content: {
    padding: 16,
  },
  input: {
    marginTop: 20,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  divider: {
    height: 4,
  },
});

export default EditProfile;
