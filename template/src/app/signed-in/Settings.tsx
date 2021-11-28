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
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function EditProfile(): JSX.Element | null {
  const user = auth().currentUser;

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

  useEffect(() => {
    if (error) {
      Alert.alert('Create Account - Error', error);
    }
  }, [error]);

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
    <ScrollView style={styles.container}>
      <Banner
        visible={!user.emailVerified}
        actions={[
          {
            label: 'Re-send',
            onPress: () => {
              user.sendEmailVerification().then(() =>
                Alert.alert(
                  'Verification',
                  `A verification email has been sent to 
                    ${user.email}
                    . Please follow the instructions to verify your email address.`,
                ),
              );
            },
          },
        ]}
        icon={({size}) => (
          <Icon name="alert-decagram" size={size} color="#f44336" />
        )}
        style={styles.banner}>
        Please verify your email address to use the full features of this app!
        Click the button below to resend a verification email.
      </Banner>
      <View style={styles.content}>
        <Title>Display Settings:</Title>
        <Paragraph>
          Set a custom display name for a personalized greeting.
        </Paragraph>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Display Name"
          value={displayName}
          onChangeText={setDisplayName}
          autoComplete="name"
        />
        <Button
          mode="outlined"
          loading={savingName}
          onPress={handleDisplayName}
          style={styles.button}>
          Save
        </Button>
      </View>
      <Divider />
      <View style={styles.content}>
        <Title>Password Update:</Title>
        <Paragraph>
          Update your account password. For security purposes, please enter your
          current account password.
        </Paragraph>
        <TextInput
          secureTextEntry
          style={styles.input}
          mode="outlined"
          label="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          autoComplete="password"
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          mode="outlined"
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          autoComplete="password"
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          mode="outlined"
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoComplete="password"
        />
        <Button
          disabled={!currentPassword || !newPassword || !confirmPassword}
          mode="outlined"
          loading={savingPassword}
          onPress={handlePassword}
          style={styles.button}>
          Update
        </Button>
      </View>
      <Divider />
      <View style={[styles.content, styles.actions]}>
        <Button
          mode="contained"
          loading={signingOut}
          onPress={() => (signingOut ? null : signOut())}
          style={[styles.button, styles.maxWidth]}>
          Sign Out
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  maxWidth: {
    width: '100%',
  },
  content: {
    padding: 16,
  },
  banner: {
    backgroundColor: '#ffebee',
  },
  input: {
    marginTop: 20,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  actions: {
    backgroundColor: '#F6F7F8',
  },
});

export default EditProfile;
