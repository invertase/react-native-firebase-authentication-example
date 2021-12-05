import {createStackNavigator} from '@react-navigation/stack';
import {useAppSettings} from '../components/AppSettings';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';
import PhoneSignIn from './PhoneSignIn';
import SignIn from './SignIn';

const Stack = createStackNavigator();

function SignedOutStack() {
  const appSettings = useAppSettings();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={SignIn}
        options={{headerShown: false, title: appSettings.t('signIn')}}
      />
      <Stack.Screen
        name="CreateAccount"
        options={{title: appSettings.t('createAnAccount')}}
        component={CreateAccount}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{title: appSettings.t('forgotPassword')}}
      />
      <Stack.Screen
        name="PhoneSignIn"
        component={PhoneSignIn}
        options={{title: appSettings.t('phoneSignInTitle')}}
      />
    </Stack.Navigator>
  );
}

export default SignedOutStack;
