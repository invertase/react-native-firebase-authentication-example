# 🛸 ProjectName

> ⚠️ [Please be sure your environment is set up correctly for React Native CLI.](https://reactnative.dev/docs/environment-setup)

## ⭐ Features

- [React Native Web](https://necolas.github.io/react-native-web/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons#readme)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native Firebase](https://rnfirebase.io)
- [React Native Facebook SDK](https://github.com/thebergamo/react-native-fbsdk-next#readme)
- [React Native Google Signin](https://github.com/react-native-google-signin/google-signin#readme)
- [React Native Apple Authentication](https://github.com/invertase/react-native-apple-authentication#readme)

## Running the app

### Web

#### Development

Run the app: `yarn web`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### Production

Build the app: `yarn build-web`
Use the app `npx serve -s build/`

### Native

1. Start Metro Bundler: `yarn start`
2. Start the Android app: `yarn android`
3. Start the iOS app: `yarn ios` (make sure you have installed pods first! `yarn ios:pods` if needed)

## Development Tools

1. Check your code style with `yarn lint:all` (runs eslint, prettier, and tsc)
1. Check your code correctness with `yarn test:all` (runs jest)

## Project Configuration

This project assumes you have followed the configuration instructions provided in [the template README](https://github.com/invertase/react-native-firebase-authentication-example#readme).

Social authentication providers are not currently working on web, but work on native.

PRs welcome to these repositories to add react-native-web support! :pray:

- [React Native Facebook SDK](https://github.com/thebergamo/react-native-fbsdk-next#readme)
- [React Native Google Signin](https://github.com/react-native-google-signin/google-signin#readme)
- [React Native Apple Authentication](https://github.com/invertase/react-native-apple-authentication#readme)
