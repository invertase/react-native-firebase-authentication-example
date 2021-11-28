import {NativeModules} from 'react-native';

jest.mock('@react-native-google-signin/google-signin', () => {
  const mockGoogleSignin = jest.requireActual(
    '@react-native-google-signin/google-signin',
  );

  mockGoogleSignin.GoogleSignin.hasPlayServices = () => Promise.resolve(true);
  mockGoogleSignin.GoogleSignin.configure = () => Promise.resolve();
  mockGoogleSignin.GoogleSignin.currentUserAsync = () =>
    Promise.resolve({
      name: 'name',
      email: 'test@example.com',
      // .... other user data
    });

  // ... and other functions you want to mock

  return mockGoogleSignin;
});

NativeModules.RNGoogleSignin = {
  BUTTON_SIZE_ICON: 0,
  BUTTON_SIZE_STANDARD: 0,
  BUTTON_SIZE_WIDE: 0,
  BUTTON_COLOR_AUTO: 0,
  BUTTON_COLOR_LIGHT: 0,
  BUTTON_COLOR_DARK: 0,
  SIGN_IN_CANCELLED: '0',
  IN_PROGRESS: '1',
  PLAY_SERVICES_NOT_AVAILABLE: '2',
  SIGN_IN_REQUIRED: '3',
  configure: jest.fn(),
  currentUserAsync: jest.fn(),
};

export default {NativeModules};
