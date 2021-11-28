import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type ProviderID = 'google.com' | 'facebook.com' | 'apple.com';

const providerNames = {
  'google.com': 'Google',
  'facebook.com': 'Facebook',
  'apple.com': 'Apple',
};

const providerTitles: {[key: string]: string} = {
  SIGN_IN: 'Sign in with',
  LINK: 'Link',
  UNLINK: 'Unlink',
};

/**
 * Return array of user auth providers
 */
export function getProviders(user: FirebaseAuthTypes.User | null): string[] {
  if (user) {
    return user.providerData.map(provider => provider.providerId);
  }

  return [];
}

export function getProviderButtonTitle(
  user: FirebaseAuthTypes.User | null,
  providerID: ProviderID,
) {
  const providers = getProviders(user);
  const isProvider = providers.includes(providerID);
  const isOnlyProvider = providers.length === 1 && isProvider;
  let variant = 'SIGN_IN';

  if (user) {
    variant = isProvider ? 'UNLINK' : 'LINK';
  }

  return {
    variant,
    title: `${providerTitles[variant]} ${providerNames[providerID]}`,
    isOnlyProvider,
  };
}

export function handleAuthError(
  error: FirebaseAuthTypes.PhoneAuthError,
  errorHandler: CallableFunction,
): void {
  switch (error.code) {
    case 'auth/account-exists-with-different-credential':
    case 'auth/email-already-in-use':
      errorHandler('There already exists an account with this email address.');
      break;
    case 'auth/invalid-email':
      errorHandler('Please enter a valid email address.');
      break;
    case 'auth/invalid-credential':
      errorHandler('Your credentials are invalid or expired.');
      break;
    case 'auth/user-disabled':
      errorHandler('Your account has been disabled.');
      break;
    case 'auth/operation-not-allowed':
      console.info(
        'The type of account corresponding to the credential is not enabled. Enable the account type in the Firebase Console, under the Auth tab.',
      );
      errorHandler(
        'These type of accounts are not enabled for this app by the developer. More info is available in the console output.',
      );
      break;
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      errorHandler('No user found or wrong password.');
      break;
    case 'auth/invalid-verification-code':
      errorHandler(
        'Unable to sign you in, the verification code is invalid. Please try again.',
      );
      break;
    case 'auth/invalid-verification-id':
      errorHandler(
        'Unable to sign you in, the verification ID is invalid. Please try again.',
      );
      break;
    case 'auth/invalid-phone-number':
      errorHandler('Please enter a valid phone number.');
      break;
    case 'auth/missing-phone-number':
      errorHandler('Please enter a phone number.');
      break;
    case 'auth/quota-exceeded':
      errorHandler('This app has exceeded its SMS quota.');
      break;
    default:
      errorHandler(error.message);
      console.error(error);
      break;
  }
}
