import dayjs from 'dayjs';
import {useContext} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Caption,
  FAB,
  Headline,
  Subheading,
  useTheme,
  Title,
  withTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';
import {UserContext} from '../App';
import Hero from '../components/Hero';
import Provider from '../components/AuthProvider';
import Facebook from '../auth-providers/Facebook';
import Google from '../auth-providers/Google';
import Apple from '../auth-providers/Apple';
import {getProviders} from '../util/helpers';

function Profile() {
  const theme = useTheme();
  const user = useContext(UserContext);
  const navigation = useNavigation();

  if (!user) {
    return null;
  }

  // Array of providers the the user is linked with
  const providers = getProviders(user);

  return (
    <View style={styles.container}>
      <Hero height={60} />
      <View style={[styles.content, styles.profile]}>
        {user.photoURL ? (
          <Avatar.Image size={80} source={{uri: user.photoURL}} />
        ) : (
          <Avatar.Text
            size={80}
            label={
              user.displayName
                ? user.displayName.substring(0, 2).toUpperCase()
                : user.email
                ? user.email.substring(0, 2).toUpperCase()
                : 'A'
            }
            style={styles.avatar}
          />
        )}
      </View>
      <View style={styles.content}>
        <Headline>
          {user.displayName ? user.displayName : user.email}{' '}
          {user.emailVerified && (
            <Icon name="check-decagram" color="#2196f3" size={26} />
          )}
        </Headline>
        {!!user.displayName && <Title>{user.email}</Title>}
        {!!user.phoneNumber && <Subheading>{user.phoneNumber}</Subheading>}
        {!!user.metadata.lastSignInTime && (
          <Caption>
            {`Last sign-in: ${dayjs(user.metadata.lastSignInTime).format(
              'DD/MM/YYYY HH:mm',
            )}`}
          </Caption>
        )}
      </View>
      <View style={[styles.providers, {backgroundColor: theme.colors.surface}]}>
        <Provider type="password" active={providers.includes('password')} />
        <Provider type="facebook" active={providers.includes('facebook.com')} />
        <Provider type="google" active={providers.includes('google.com')} />
        <Provider type="phone" active={providers.includes('phone')} />
      </View>
      <FAB
        color="#fff"
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        icon="account-settings"
        // @ts-ignore FIXME need to type the navigator
        onPress={() => navigation.navigate('Settings')}
      />

      <View style={styles.center}>
        {Platform.OS !== 'web' && <Facebook />}
        {Platform.OS !== 'web' && <Google />}
        {Platform.OS !== 'web' && <Apple />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    paddingHorizontal: 20,
  },
  profile: {
    marginTop: -50,
    paddingVertical: 10,
  },
  avatar: {
    borderWidth: 5,
    elevation: 4,
  },
  providers: {
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30,
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  center: {
    width: '100%',
    alignItems: 'center',
  },
});

export default withTheme(Profile);
