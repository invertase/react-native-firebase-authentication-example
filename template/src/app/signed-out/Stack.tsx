import React from 'react';
import {BaseNavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme, withTheme} from 'react-native-paper';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';
import PhoneSignIn from './PhoneSignIn';
import SignIn from './SignIn';

const Stack = createStackNavigator();

function SignedOutStack() {
  const theme = useTheme();

  return (
    <BaseNavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary
          },
          headerTintColor: theme.colors.accent
        }}
      >
        <Stack.Screen name='SignIn' component={SignIn} options={{header: undefined}} />
        <Stack.Screen name='CreateAccount' options={{title: 'Create Account'}} component={CreateAccount} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{title: 'Forgot Password'}} />
        <Stack.Screen name='PhoneSignIn' component={PhoneSignIn} />
      </Stack.Navigator>
    </BaseNavigationContainer>
  );
}

export default withTheme(SignedOutStack);
