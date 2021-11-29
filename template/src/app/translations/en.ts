import {translation} from './index';
require('dayjs/locale/en');

export const english: translation = {
  loading: 'Loading',
  forgotPassword: 'Forgot Password?',
  createAnAccount: 'Create an Account',
  phoneSignIn: 'Sign in with phone number',
  phoneSignInTitle: 'Phone Sign In',
  signIn: 'Sign In',

  gettingStarted: 'Getting Started',
  userInfo: 'User Info',
  settings: 'Settings',

  createAccountError: 'Create Account - Error',
  createAccountPasswordsDifferent: 'Passwords do not match',
  createAccountInstructions:
    'Create an account with your email and password. Once created you will be automatically logged in to your profile:',
  emailLabel: 'Email Address',
  passwordLabel: 'Password',
  createAccountPasswordConfirmLabel: 'Confirm Password',
  createAccountCreating: 'Creating Account',
  createAccountCreate: 'Create Account',

  forgotPasswordInstructions:
    'Enter your email address below to send a password reset email:',
  forgotPasswordLabel: 'Email Address',
  forgotPasswordError: 'Forgot Password - Error',
  forgotPasswordSucess: 'Check your email for password reset instructions',
  forgotPasswordSending: 'Sending Password Reset',
  forgotPasswordSend: 'Send Password Reset',

  phoneAuthError: 'Phone Auth Error',
  phoneVerificationError: 'Phone Verification Error',
  phoneVerificationCode: 'Verification Code',
  phoneVerificationConfirm: 'Confirm',
  phoneVerificationCountryInstructions: 'Touch to select phone number country',
  phoneVerificationNumberInstructions: 'Enter your phone number:',
  phoneVerificationNumberLabel: 'Phone Number',
  phoneVerificationNumberSubmit: 'Submit',

  signInError: 'Sign In - Error',
  signInSigningIn: 'Signing In',
  signInSignIn: 'Sign In',

  profileLastSignIn: 'Last sign-in',

  userUpdateError: 'User Update Error',
  userPasswordChanged: 'Password successfully changed',
  userEmailVerify: 'Re-send',
  userEmailVerification: 'Verification',
  userEmailVerificationInstructions1: 'A verification email has been sent to',
  userEmailVerificationInstructions2:
    'Please follow the instructions to verify your email address',
  userEmailVerificationBanner:
    'Please verify your email address to use the full features of this app! Click the button below to resend a verification email.',
  userDisplayLabel: 'Display Settings:',
  userNameDisplayLabel: 'Display Name',
  userNameDisplayInstructions:
    'Set a custom display name for a personalized greeting',
  userNameDisplaySave: 'Save',
  userPasswordUpdateLabel: 'Password Update:',
  userPasswordInstructions:
    'Update your account password. For security purposes, please enter your current account password.',
  userPasswordCurrent: 'Current Password',
  userPasswordNew: 'New Password',
  userPasswordConfirm: 'Confirm New Password',
  userPasswordUpdate: 'Update',
  userSignOut: 'Sign Out',
};
