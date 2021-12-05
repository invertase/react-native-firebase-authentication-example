import appJson from '../app.json';
import {StyleSheet, View} from 'react-native';
import {createContext, Fragment, ReactNode, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  Headline,
  ActivityIndicator,
  Provider as PaperProvider,
} from 'react-native-paper';
import SignedInStack from './signed-in/Stack';
import SignedOutStack from './signed-out/Stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {useAppSettings} from './components/AppSettings';

/**
 * Types
 */
type User = FirebaseAuthTypes.User | null;

/**
 * Contexts
 */
export const UserContext = createContext<User>(null);

function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [listenUser, setListenUser] = useState(false);
  const [user, setUser] = useState<User>(null);
  const appSettings = useAppSettings();

  /** Listen for auth state changes */
  useEffect(() => {
    const authListener = auth().onAuthStateChanged(result => {
      setUser(result);
      if (initializing && !listenUser) {
        setInitializing(false);
        setListenUser(true);
      }
    });

    return () => {
      if (authListener) {
        authListener();
      }
    };
  }, [initializing, listenUser]);

  /** Listen for user changes */
  useEffect(() => {
    let userListener: () => void;

    if (listenUser) {
      // TODO @react-native-firebase/auth provides `onUserChanged` which is this and more.
      // what else can we add and still be web-compatible?
      userListener = auth().onIdTokenChanged(result => {
        setUser(result);
      });
    }

    return () => {
      if (userListener) {
        userListener();
      }
    };
  }, [listenUser]);

  if (initializing) {
    let waiting = true;
    setTimeout(() => {
      waiting = false;
    }, 1000);

    return (
      <View
        style={[
          styles.loadingContainer,
          {backgroundColor: appSettings.currentTheme.colors.background},
        ]}>
        {!waiting && (
          <Fragment>
            <Headline
              style={[
                styles.padded,
                {color: appSettings.currentTheme.colors.text},
              ]}>
              {appSettings.t('loading')}...
            </Headline>
            <ActivityIndicator
              size={'large'}
              theme={{
                ...appSettings.currentTheme,
                colors: {primary: appSettings.currentTheme.colors.accent},
              }}
            />
          </Fragment>
        )}
      </View>
    );
  }

  function container(children: ReactNode | ReactNode[]) {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={appSettings.currentTheme}>
          <NavigationContainer
            linking={{
              prefixes: [
                'invertase.github.io/react-native-firebase-authenticationi-example',
                'localhost',
              ],
              config: {
                screens: {
                  Details: 'details',
                  UserProfile: 'user/profile',
                  CreateAccount: 'account/create',
                  ForgotPassword: 'password/forgot',
                  PhoneSignIn: 'sign-in/phone',
                  // Used as catch-all - there is a "Home" in signed-in and signed-out stacks!
                  home: '*',
                },
              },
            }}
            documentTitle={{
              formatter: (options, route) =>
                `${appJson.displayName} - ${options?.title ?? route?.name}`,
            }}
            theme={appSettings.currentTheme}>
            {children}
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }

  return container(
    user ? (
      <UserContext.Provider value={user}>
        <SignedInStack />
      </UserContext.Provider>
    ) : (
      <SignedOutStack />
    ),
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    // alignSelf: 'center',
    alignItems: 'center',
    // textAlignVertical: true,
  },
  padded: {
    padding: 40,
  },
});

export default App;
