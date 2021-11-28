import {BaseNavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme, withTheme} from 'react-native-paper';
import Profile from './Profile';
import Settings from './Settings';

const Stack = createStackNavigator();

function SignedInStack() {
  const theme = useTheme();

  return (
    <BaseNavigationContainer>
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
    </BaseNavigationContainer>
  );
}

export default withTheme(SignedInStack);
