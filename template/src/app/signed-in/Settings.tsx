import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  Banner,
  Button,
  Divider,
  Paragraph,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSettings} from '../AppSettings';

function EditProfile(): JSX.Element | null {
  const user = auth().currentUser;
  const theme = useTheme();
  const appSettings = useAppSettings();

  const [error, setError] = useState('');
  const [signingOut, setSigningOut] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [displayName, setDisplayName] = useState(
    user ? user.displayName || '' : '',
  );
  const [savingPassword, setSavingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      Alert.alert(appSettings.t('userUpdateError'), error);
    }
    if (passwordSuccess) {
      Alert.alert(appSettings.t('userPasswordChanged'));
      setPasswordSuccess(false);
      // @ts-ignore
      navigation.navigate('SignIn');
    }
  }, [error, passwordSuccess, appSettings]);

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
        await user.reload();
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setSavingName(false);
      }
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
        setPasswordSuccess(true);
      } catch (e) {
        setError((e as Error).message);
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
            label: appSettings.t('userEmailVerify'),
            onPress: () => {
              user.sendEmailVerification().then(() =>
                Alert.alert(
                  appSettings.t('userEmailVerification'),
                  `${appSettings.t('userEmailVerificationInstructions1')} 
                    ${user.email}
                    . ${appSettings.t('userEmailVerificationInstructions2')}.`,
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
        <Paragraph>{appSettings.t('userPasswordUpdateInstructions')}</Paragraph>
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
        <Button
          disabled={!currentPassword || !newPassword || !confirmPassword}
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
