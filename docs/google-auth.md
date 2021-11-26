# Google Authentication

This project comes set up with [react-native-google-signin](https://github.com/react-native-google-signin/google-signin) out of the box,
allowing you to take full advantage of Google's native SDK. Example authentication code can be found in [src/providers/Google.tsx](/src/providers/Google.tsx).

As with all third party authentication providers you will need to configure your project details to use Google's SDK.

Please note, Google authentication is currently only available on native platforms.

## Configuration

This guide assumes that you have already created your Firebase app and configured your iOS and Android projects as explained in [README](README.md).

To begin, replace the webClientId in `src/config.json` with your own, which is used by the app to call `GoogleSignin.configure`; and is needed whenever that method is called. This ID is automatically generated when you create your Firebase project and you can find it under "Web Application -> Client ID" in your [Google Cloud Console](https://console.developers.google.com/apis/credentials). Make sure you select right project.

### IOS

1. Open your project via XCode and navigate to your `GoogleService-Info.plist` file (normally located at `/ios/[YourApp]/Info.plist`). Copy your `REVERSED_CLIENT_ID` from this file.

2. Alternatively, click on your xcode project icon (blue one) and under Info tab expand `URL Types` panel. Add new url type and under `URL Schema` paste your previously coppied `REVERSED_CLIENT_ID` field value. NOTE: you might see more entries here if you use other social auth providers like Facebook.
   ![google url type](/docs/assets/google-url-type.png)

3. Run your app and make sure that everything is working. If you run into any trouble it is worth trying to clean your caches and restart XCode (possibly via `npx react-native-clean-project`)

### Android

Android uses `keystore` system for app signing, if you haven't already done so you will need to generate keystore files for debug (later also release) builds.
In depth information about this is available in [Android keystore documentation](https://developer.android.com/training/articles/keystore)

1. If you don't have one generate a `debug.keystore` file in your `android/app` directory. These keystore files are required to run android apps in debug and release mode. To generate debug keystore file run following command within `android/app` folder (use all default presets when prompted by terminal).

   ```bash
   keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
   ```

2. After you generated your `debug.keystore` file, run following command in the same folder (`android/app`) to obtain your SHA1 and SHA256 certificate fingerprints. Copy both of them, you will need them in the next step.

   ```bash
   keytool -list -v -keystore ./debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```

3. Once you have your SHA1 and SHA256 certificate fingerprints go yo your Firebase project settings, choose your android app and certificate fingerprints you copied from the previous step.

4. Re-download your `google-services.json` file and move it to `android/app` folder (replace your old file if needed).

5. Now clean your android project: In android studio go to `Build` > `Clean Project`.

   ![clean android build](/docs/assets/clean-android-project.png)

6. Run your app and make sure that everything is working. If you run into any trouble it is worth trying to clean your caches and restart Android Studio.

### Firebase

1. In **_Firebase Console_** go to `Authentication` > `Sign In Method` and enable Google. You will be prompted to enter your Web Client ID and Web Client Secret.
   These can be found in your [Google Cloud Console](https://console.developers.google.com/apis/credentials)
