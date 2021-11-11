# Firebase Authentication Example for React Native

Thank you for trying the Firebase Authentication example 👏

**Please note that limited support is offered for this example though we will happily accept PRs.**

The following authentication features are ready for use in this example:

 - Sign In
 - Sign Out
 - Create account
 - Forgot Password
 - Sign in with social auth providers
 - Sign in with phone auth (with country selection)
 - Linking social profiles
 - Change Password
 - Email verification
 - Updating user profile

and the following providers:

 - Email / Password Sign In
 - Facebook
 - Google
 - Phone Auth via SMS

## Getting started

Ensure your development environment is set up for React Native by following the [React Native documentation](https://reactnative.dev/docs/environment-setup).

### Install dependencies

1. Install [NPM](https://www.npmjs.com) dependencies with [Yarn](https://yarnpkg.com/lang/en/): `yarn`.
2. Install [CocoaPods](https://cocoapods.org) inside of the `ios` directory: `npx pod-install`

### Android: Setting up App Signing

Google Sign-In requires a `keystore` file to be added to your project and the Firebase console for both debug and release builds, we've included a `debug` one by default. To setup a new `keystore` file, follow the [guide here](https://developer.android.com/studio/publish/app-signing#debug-mode).

### Add your app id and name

This project is preconfigured with `market.reactnative.firebaseauthkit` as its app id. You will probably want to replace it using the `rename-script` npm script provided with this product.

### Add your Firebase credentials

1. Choose your existing Firebase project from the [Firebase console](https://console.firebase.google.com/).
   > Creating a new project? Check out the React Native Firebase [documentation](https://rnfirebase.io/#prerequisites).
2. Add the Firebase credentials to your project by following documentation for [Android](https://rnfirebase.io/#generating-android-credentials) and [iOS](https://rnfirebase.io/#generating-ios-credentials).

**WARNING** The application will _not_ start until you copy your `GoogleServices-Info.plist` file into `./ios/FirebaseAuthenticationKit/` and your `google-services.json` into `./android/app/`. It will install and begin running but then crash immediately as those files are necessary for Firebase to start.

### Run the app

- Start the metro javascript bundler: `yarn start`
- For android: `yarn android`
- For iOS: `yarn ios`

## Authentication Providers

The Firebase Authentication Example supports multiple authentication providers. Follow the links below for documentation on setting up each provider:

- [Apple Authentication](/docs/apple.md)
- [Email and Password Authentication](/docs/email-password-auth.md)
- [Facebook Authentication](/docs/facebook-auth.md)
- [Google Authentication](/docs/google-auth.md)
- [Phone Authentication](/docs/phone-auth.md)
