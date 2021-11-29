import {createStackNavigator} from '@react-navigation/stack';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';
import PhoneSignIn from './PhoneSignIn';
import SignIn from './SignIn';

const Stack = createStackNavigator();

function SignedOutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false, title: 'Sign In'}}
      />
      <Stack.Screen
        name="CreateAccount"
        options={{title: 'Create Account'}}
        component={CreateAccount}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{title: 'Forgot Password'}}
      />
      <Stack.Screen
        name="PhoneSignIn"
        component={PhoneSignIn}
        options={{title: 'Phone Sign In'}}
      />
    </Stack.Navigator>
  );
}

export default SignedOutStack;
