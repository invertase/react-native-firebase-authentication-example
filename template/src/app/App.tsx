import React from 'react';
import {Text} from 'react-native';
import {createContext, ReactNode, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Provider} from 'react-native-paper';

import theme from './theme';
import SignedInStack from './signed-in/Stack';
import SignedOutStack from './signed-out/Stack';

/**
 * Types
 */
type User = FirebaseAuthTypes.User | null;

/**
 * Context
 */
export const UserContext = createContext<User>(null);

function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [listenUser, setListenUser] = useState(false);
  const [user, setUser] = useState<User>(null);

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
    return <Text>Loading...</Text>;
  }

  function container(children: ReactNode | ReactNode[]) {
    return <Provider theme={theme}>{children}</Provider>;
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

export default App;
