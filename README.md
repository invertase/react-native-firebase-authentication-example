# Firebase Authentication Example for React Native

Thank you for trying the Firebase Authentication example 👏

Just want to try it? [It's live right here. Go play!](https://invertase.github.io/react-native-firebase-authentication-example/)

![How-its-going](/docs/assets/hero.png)

![See-it-in-action](/docs/assets/RNFBAuthDemo.gif)

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
- Firebase email templates configured to match device locale

and the following providers:

- Email / Password Sign In
- Phone Auth via SMS
- Apple (Native, iOS only, PRs needed for web support)
- Facebook (Native only, PRs needed for web support)
- Google (Native only, PRs needed for web support)

This template creates an app that comes out of the box ready with [typescript](https://www.typescriptlang.org/) and [react-native-web](https://necolas.github.io/react-native-web/) support, based on [the Luna template](https://github.com/plaut-ro/luna#readme)

This template also has single-source theme configuration and light/dark switching configured to follow system preference, as well as dynamic detection of user locale and an included translation system (English and Spanish translations to demonstrate how it works)

It's ready to go for a modern-looking international app.

## Getting started

Ensure your development environment is set up for React Native by following the [React Native documentation](https://reactnative.dev/docs/environment-setup).

### Create an app using the template

1. For a quick demonstration, this template is pre-configured with a firebase project called `ProjectName`, if you just want to see it work, run `npx react-native init ProjectName --template invertase/react-native-firebase-authentication-example
1. For a real project, replace `ProjectName` in the init command with your new project's real name, then follow the configuration instructions below

### Android: Setting up App Signing

Google Sign-In requires a `keystore` file to be added to your project and the Firebase console for both debug and release builds, we've included a `debug` one by default. To setup a new `keystore` file, follow the [guide here](https://developer.android.com/studio/publish/app-signing#debug-mode).

### Add your Firebase credentials

1. Choose your existing Firebase project from the [Firebase console](https://console.firebase.google.com/).
   > Creating a new project? Check out the React Native Firebase [documentation](https://rnfirebase.io/#prerequisites).
2. Replace the native Firebase credentials template files to your project by following documentation for [Android](https://rnfirebase.io/#generating-android-credentials) and [iOS](https://rnfirebase.io/#generating-ios-credentials).
3. Copy the web config from Firebase console into `src/shims/firebase-init.ts`

### Run the app

- Start the metro javascript bundler: `yarn start`
- For android: `yarn android`
- For apple: `yarn ios`
- For web: `yarn web`
- For testing (jest): `yarn test:all`
- For linting (format, lint, typescript): `yarn lint:all`

## Authentication Providers

The Firebase Authentication Example supports multiple authentication providers.

Follow the links below for documentation on setting up each provider:

- [Apple Authentication](/docs/apple.md)
- [Email and Password Authentication](/docs/email-password-auth.md)
- [Facebook Authentication](/docs/facebook-auth.md)
- [Google Authentication](/docs/google-auth.md)
- [Phone Authentication](/docs/phone-auth.md)
