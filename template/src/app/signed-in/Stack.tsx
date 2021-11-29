import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppSettings} from '../AppSettings';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {App as GettingStarted} from '../../luna-app/App';
import Profile from './Profile';
import Settings from './Settings';

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

const ProfileStack = () => {
  const appSettings = useAppSettings();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        options={{title: appSettings.t('settings')}}
        component={Settings}
      />
    </Stack.Navigator>
  );
};

const SignedIn = () => {
  // Used for status bar layout in react-navigation
  const insets = useSafeAreaInsets();
  const appSettings = useAppSettings();

  const screenOptions = {
    tabBarStyle: {
      paddingTop: insets.top,
    },
  };

  return (
    <TopTabs.Navigator screenOptions={screenOptions}>
      <TopTabs.Screen
        name="Getting Started"
        options={{title: appSettings.t('gettingStarted')}}
        component={GettingStarted}
      />
      <TopTabs.Screen
        name="User Info"
        options={{title: appSettings.t('userInfo')}}
        component={ProfileStack}
      />
    </TopTabs.Navigator>
  );
};

export default SignedIn;
