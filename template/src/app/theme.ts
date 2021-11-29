import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

// Customize the themes here as necessary

export const darkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#009688',
  },
};

export const defaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#009688',
  },
};

// export default {
//   ...DefaultTheme,
//   dark: false,
//   roundness: 3,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#009688',
//     accent: '#fff',
//     background: '#fff',
//   },
// };
