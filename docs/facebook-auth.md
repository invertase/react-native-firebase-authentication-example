# Facebook Authentication

This project comes set up with [react-native-fbsdk-next](https://github.com/thebergamo/react-native-fbsdk-next) out of the box,
allowing you to take full advantage of Facebook's native SDK. Example authentication code can be found in [src/providers/Facebook.tsx](/src/providers/Facebook.tsx).

As with all third party authentication providers you will need to configure your project details to use Facebook's SDK.

Please note, Facebook authentication is currently only available on native platforms.

## Configuration

Before you begin you will need to create a developer account at [Facebook Developer Portal](https://developers.facebook.com) if you haven't done so already.
Once you have your developer account set up:

1. Go to **Facebook Developer Dashboard** and create a new app id.

2. Click on _Facebook Login_ to start the setup.

### IOS

1. Select iOS quickstart in **Facebook Developer Dashboard**

2. Adding `FBSDKLoginKit` CocoaPod is not required as auth kit already includes it.

3. Add the Bundle ID that you've defined in Xcode when prompted and click continue.

4. If you want to allow users to sign in via notifications enable single sign on.

5. You will be given code snippets to add to your [Info.plist](/template/ios/ProjectName/Info.plist) file. To add them:

   1. Open your [.xcworkspace](ios/ProjectName.xcworkspace) project via XCode.
   2. Locate your `Info.plist` file and right click: `Open As` -> `Source Code`.
      ![xcode-plist](/docs/assets/xcode-info-plist.png)
   3. Replace the template default configuration in your url type details snippet.
      ![xcode-url-schema](/docs/assets/xcode-url-schema.png)
   4. Any other Facebook Info.plist config snippets should be replaced with your new Facebook App Id and Client Token.
   5. NOTE: You don't need to add `-ObjC` flag to your project as all React Native apps already include it.

6. The "Connect AppDelegate" step is not required as auth kit already includes it.

### Android

1. Select Android quickstart **Facebook Developer Dashboard**.

2. You don't need to download SDK, everything is already pre-configured

3. Fill in your app details.

4. Generate development key hash (as instructed in **Facebook Developer Dashboard**).

5. Add the generated resources, Facebook App ID and Client Token to your project, with an update to [android/app/res/values/strings.xml](template/android/app/res/values/strings.xml) and [android/app/src/main/AndroidManifest.xml](template/android/app/src/main/AndroidManifest.xml) everything else is already included.
   ![android strings](/docs/assets/android-strings.png)

6. The rest of the native implementation is already pre-configured.

### Firebase

Once iOS & Android have been configured, open the **Facebook Developer Dashboard** and **Firebase Console**.

1. In **_Firebase Console_** go to `Authentication` > `Sign In Method` and enable Facebook. You will be prompted to enter your App ID and App Secret:
   ![firebase-console](/docs/assets/firebase-facebook-details.png)

2. Go to your **Facebook Developer Dashboard** and select your app, then go to `Settings` > `Basic`. Here You will find your App ID and App secret. Copy these and add them in your **Firebase Console**:
   ![facebook-appid-secret](/docs/assets/fb-dev-appid-secret.png)

3. In the **Firebase Console**, copy the `oAuth redirect url` and go back to **Facebook Developer Dashboard**, here choose `Facebook Login` > `Settings` and paste `oAuth redirect url` in _Valid oAuth Redirect URL's_ field:
   ![facebook-oauth-redirect](/docs/assets/facebook-oauth-url.png)
