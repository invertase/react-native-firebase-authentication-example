import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useColorScheme} from 'react-native';
import {useTheme, withTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {App as GettingStarted} from '../../luna-app/App';
import Profile from './Profile';
import Settings from './Settings';

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

const ProfileStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.accent,
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{header: undefined}}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

const SignedIn = () => {
  // Used for status bar layout in react-navigation
  const insets = useSafeAreaInsets();

  // Dark mode theming items
  const isDarkMode = useColorScheme() === 'dark';
  const accentColor = isDarkMode ? Colors.lighter : Colors.darker;
  const primaryColor = isDarkMode ? Colors.darker : Colors.lighter;

  const screenOptions = {
    tabBarStyle: {
      backgroundColor: primaryColor,
      paddingTop: insets.top,
    },
    tabBarLabelStyle: {color: isDarkMode ? Colors.light : Colors.dark},
    tabBarIndicatorStyle: {backgroundColor: accentColor},
  };

  return (
    <TopTabs.Navigator screenOptions={screenOptions}>
      <TopTabs.Screen name="Getting Started" component={GettingStarted} />
      <TopTabs.Screen name="Profile" component={ProfileStack} />
    </TopTabs.Navigator>
  );
};

const Colors = {
  primary: '#1292B4',
  white: '#FFF',
  lighter: '#F3F3F3',
  light: '#DAE1E7',
  dark: '#444',
  darker: '#222',
  black: '#000',
};

export default withTheme(SignedIn);
