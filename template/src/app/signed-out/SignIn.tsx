import {Fragment} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {useLinkTo} from '@react-navigation/native';
import Hero from '../components/Hero';
import ProviderButton from '../components/AuthProviderButton';
import EmailPassword from '../auth-providers/EmailPassword';
import Facebook from '../auth-providers/Facebook';
import Google from '../auth-providers/Google';
import Apple from '../auth-providers/Apple';
import {useAppSettings} from '../components/AppSettings';

function SignIn() {
  const theme = useTheme();
  const appSettings = useAppSettings();
  const linkTo = useLinkTo();

  return (
    <Fragment>
      <Hero
        height={300}
        image={
          'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
        }>
        <EmailPassword />
      </Hero>

      <View style={styles.center}>
        <Button
          color="#9e9e9e"
          onPress={() => {
            linkTo('/account/password/forgot');
          }}
          style={styles.button}>
          {appSettings.t('forgotPassword')}
        </Button>
        <Button
          mode="contained"
          icon="plus"
          onPress={() => {
            linkTo('/account/create');
          }}
          style={styles.button}>
          {appSettings.t('createAnAccount')}
        </Button>

        <View
          style={[styles.divider, {backgroundColor: theme.colors.primary}]}
        />

        {Platform.OS !== 'web' && <Facebook />}
        {Platform.OS !== 'web' && <Google />}
        {Platform.OS !== 'web' && <Apple />}
        <ProviderButton
          type="phone"
          onPress={() => {
            linkTo('/account/phone/login');
          }}>
          {appSettings.t('phoneSignIn')}
        </ProviderButton>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 6,
    marginTop: -25,
  },
  button: {
    marginVertical: 5,
    width: 300,
  },
  divider: {
    width: 300,
    marginVertical: 20,
    height: StyleSheet.hairlineWidth,
  },
});

export default SignIn;
