#!/bin/bash
set -e

# Preserve the Auth-specific stuff we've layered on the upstream template
\rm -fr SAVE
mkdir -p SAVE/ios/ProjectName/
cp template/ios/ProjectName/GoogleService-Info.plist SAVE/ios/ProjectName/
mkdir -p SAVE/android/app/
cp template/android/app/google-services.json SAVE/android/app/
mkdir -p SAVE/src/app
cp -r template/src/app SAVE/src/
mkdir -p SAVE/src/shims
cp -r template/src/shims SAVE/src/
mkdir -p SAVE/src/__mocks__
cp -r template/src/__mocks__ SAVE/src/
mkdir -p SAVE/src/static/assets/
cp template/src/static/assets/logo.png SAVE/src/static/assets/
cp template/src/config.json SAVE/src/

# What are we checking out? where will it unpack?
GITREPO='mikehardy/luna'
GITREF='@mikehardy/upstream-convergence'
GITDIR="$( echo -e "luna-$GITREF" | tr  '@' '-' | tr '/' '-' )"

# Clean up old files
rm -rf luna-template.zip "${GITDIR}" template

# Download and unpack the current luna template as a mobile+web+typescript base
curl -q --location https://github.com/${GITREPO}/archive/refs/heads/${GITREF}.zip -o luna-template.zip
unzip -q luna-template.zip
mv "${GITDIR}/template" .
rm -rf luna-template.zip "luna-${GITDIR}"

# Move the main app aside, we will reference it inside our auth demo as part of the sign-in component stack.
mv template/src/app template/src/luna-app

# Restore our files
cp -rv SAVE/* template
\rm -fr SAVE

cd template || exit 1

# Add the firebase modules we will use
yarn add \
  firebase \
  libphonenumber-js \
  react-native-paper \
  react-native-country-picker-modal \
  @invertase/react-native-apple-authentication \
  @react-native-google-signin/google-signin \
  react-native-fbsdk-next \
  @react-native-firebase/app \
  @react-native-firebase/auth \
  @react-native-firebase/analytics \
  @react-native-firebase/crashlytics \
  @react-native-firebase/perf

# TODO Maybe sed the title and favicon of template/public/index.html ?

# FIXME Add our firebase config to the Xcode project - this will require a little ruby script

# TODO add release streams via flavors for Android, Targets for iOS

# Make sure Jest works out of the box, even though we added a bunch of stuff that needs mocks etc
npx json -I -f package.json -c 'this.jest.testEnvironment = "jsdom"'
npx json -I -f package.json -e 'this.jest.transformIgnorePatterns = ["node_modules/(?!react-native|@react-native|react-native-vector-icons|@react-navigation|@invertase/react-native-apple-authentication)"]'
npx json -I -f package.json -c 'this.jest.setupFiles = ["./src/__mocks__/react-native-firebase.js","./node_modules/react-native-gesture-handler/jestSetup.js"]'




# This is the most basic integration of Firebase for native
echo "Adding react-native-firebase core app package"
yarn add "@react-native-firebase/app"
echo "Adding basic iOS integration - AppDelegate import and config call"
sed -i -e $'s/AppDelegate.h"/AppDelegate.h"\\\n@import Firebase;/' ios/ProjectName/AppDelegate.m
rm -f ios/ProjectName/AppDelegate.m??
sed -i -e $'s/RCTBridge \*bridge/if ([FIRApp defaultApp] == nil) { [FIRApp configure]; }\\\n  RCTBridge \*bridge/' ios/ProjectName/AppDelegate.m
rm -f ios/ProjectName/AppDelegate.m??
echo "Adding basic java integration - gradle plugin dependency and call"
sed -i -e $'s/dependencies {/dependencies {\\\n        classpath "com.google.gms:google-services:4.3.10"/' android/build.gradle
rm -f android/build.gradle??
sed -i -e $'s/apply plugin: "com.android.application"/apply plugin: "com.android.application"\\\napply plugin: "com.google.gms.google-services"/' android/app/build.gradle
rm -f android/app/build.gradle??

# Add a basic firebase.json that allows crash reports TODO come out of the box with GDPR settings
printf "{\n  \"react-native\": {\n    \"crashlytics_disable_auto_disabler\": true,\n    \"crashlytics_debug_enabled\": true\n  }\n}" > firebase.json

# Crashlytics - repo, classpath, plugin, dependency, import, init
echo "Setting up Crashlytics - package, gradle plugin"
yarn add "@react-native-firebase/crashlytics"
sed -i -e $'s/dependencies {/dependencies {\\\n        classpath "com.google.firebase:firebase-crashlytics-gradle:2.8.0"/' android/build.gradle
rm -f android/build.gradle??
sed -i -e $'s/"com.google.gms.google-services"/"com.google.gms.google-services"\\\napply plugin: "com.google.firebase.crashlytics"/' android/app/build.gradle
rm -f android/app/build.gradle??

# Performance - classpath, plugin, dependency, import, init
echo "Setting up Performance - package, gradle plugin"
yarn add "@react-native-firebase/perf"
rm -f android/app/build.gradle??
sed -i -e $'s/dependencies {/dependencies {\\\n        classpath "com.google.firebase:perf-plugin:1.4.0"/' android/build.gradle
rm -f android/build.gradle??
sed -i -e $'s/"com.google.gms.google-services"/"com.google.gms.google-services"\\\napply plugin: "com.google.firebase.firebase-perf"/' android/app/build.gradle
rm -f android/app/build.gradle??

# Hermes is available on both platforms and provides faster startup since it pre-parses javascript. Enable it.
sed -i -e $'s/enableHermes: false/enableHermes: true/' android/app/build.gradle
rm -f android/app/build.gradle??
sed -i -e $'s/hermes_enabled => false/hermes_enabled => true/' ios/Podfile
rm -f ios/Podfile??

# Java build tweak - or gradle runs out of memory during the build with our larger project
echo "Increasing memory available to gradle for android java build"
sed -i -e $'s/# org.gradle.jvmargs/org.gradle.jvmargs/' android/gradle.properties
rm -f android/gradle.properties??

# This is just a speed optimization, very optional, but asks xcodebuild to use clang and clang++ without the fully-qualified path
# That means that you can then make a symlink in your path with clang or clang++ and have it use a different binary
# In that way you can install ccache or buildcache and get much faster compiles...
sed -i -e $'s/react_native_post_install(installer)/react_native_post_install(installer)\\\n    \\\n    installer.pods_project.targets.each do |target|\\\n      target.build_configurations.each do |config|\\\n        # Optionally use "relative" compiler paths. This allows use of ccache if it is in your PATH, which is a huge performance booth..\\\n        config.build_settings["CC"] = "clang"\\\n        config.build_settings["LD"] = "clang"\\\n        config.build_settings["CXX"] = "clang++"\\\n        config.build_settings["LDPLUSPLUS"] = "clang++"\\\n      end\\\n    end/' ios/Podfile
rm -f ios/Podfile??

# Disable iOS compile warnings on dependencies, they make the build log almost unreadable, to the point of being a performance problem.
sed -i -e $'s/react_native_post_install(installer)/react_native_post_install(installer)\\\n    \\\n    installer.pods_project.targets.each do |target|\\\n      target.build_configurations.each do |config|\\\n        # Optionally disable build warnings in dependencies. There are so many typically, it is a performance problem.\\\n        config.build_settings["GCC_WARN_INHIBIT_ALL_WARNINGS"] = "YES"\\\n      end\\\n    end/' ios/Podfile
rm -f ios/Podfile??

# Run pod install to get the pbxproj up to date
cd ios && pod install && cd ..

# FIXME need to slice in the craco.config changes:

# 1) add path utility at top:
# const path = require('path');

# 2) in the webpack area, add the shims
    # alias: {
    #   ['@invertase/react-native-apple-authentication$']: path.resolve(
    #     __dirname,
    #     'src/shims/react-native-apple-authentication-web.ts'
    #   ),
    #   ['@react-native-firebase/app$']: path.resolve(__dirname, 'src/shims/firebase-app-web.ts'),
    #   ['@react-native-firebase/analytics$']: path.resolve(__dirname, 'src/shims/firebase-analytics-web.ts'),
    #   ['@react-native-firebase/auth$']: path.resolve(__dirname, 'src/shims/firebase-auth-web.ts'),
    #   ['@react-native-firebase/firestore$']: path.resolve(__dirname, 'src/shims/firebase-firestore-web.ts'),
    #   ['@react-native-google-signin/google-signin$']: path.resolve(__dirname, 'src/shims/google-signin-web.ts'),
    #   ['react-native-fbsdk-next$']: path.resolve(__dirname, 'src/shims/react-native-fbsdk-next-web.ts')
    # },

# FIXME need to slice in the AndroidManifest.xml and strings.xml changes

# 1) strings:

    # <string name="facebook_app_id">1523458767976650</string>
    # <string name="fb_auto_applink_scheme">fb1523458767976650</string>
    # <string name="facebook_client_token">d157902d0bff64b4c1daaf26e32852e9</string>
    # <string name="fb_login_protocol_scheme">1523458767976650</string>

# 2) AndroidManifest.xml huge chunk after first intent:

    #     <intent-filter>
    #         <action android:name="android.intent.action.VIEW" />
    #         <category android:name="android.intent.category.DEFAULT" />
    #         <category android:name="android.intent.category.BROWSABLE" />
    #         <data android:host="applinks" android:scheme="@string/fb_auto_applink_scheme" />
    #     </intent-filter>
    #   </activity>
    #   <activity android:name="com.facebook.CustomTabActivity" android:exported="true">
    #     <intent-filter>
    #       <action android:name="android.intent.action.VIEW" />
    #       <category android:name="android.intent.category.DEFAULT" />
    #       <category android:name="android.intent.category.BROWSABLE" />
    #       <data android:scheme="@string/fb_login_protocol_scheme" />
    #     </intent-filter>
    #   </activity>
    #   <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
    #   <meta-data android:name="com.facebook.sdk.ApplicationName" android:value="@string/app_name"/>
    #   <meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string/facebook_client_token"/>
    #   <meta-data android:name="com.facebook.sdk.AutoLogAppEventsEnabled" android:value="false"/>
    #   <meta-data android:name="com.facebook.sdk.AdvertiserIDCollectionEnabled" android:value="false"/>
    #   <provider android:name="com.facebook.FacebookContentProvider" android:authorities="com.facebook.app.FacebookContentProvider355198514515820" android:exported="true" />
    # </application>
    # <queries>
    #   <provider android:authorities="com.facebook.katana.provider.PlatformProvider" />
    #   <provider android:authorities="com.facebook.orca.provider.PlatformProvider" />
    # </queries>

# FIXME need to slice in the iOS stuff dynamically, on the Info.plist

  # <key>FacebookAppID</key>
  # <string>1523458767976650</string>
  # <key>FacebookClientToken</key>
  # <string>d157902d0bff64b4c1daaf26e32852e9</string>
  # <key>LSApplicationQueriesSchemes</key>
  # <array>
  #   <string>fb-messenger-share-api</string>
  #   <string>fbauth2</string>
  #   <string>fbapi</string>
  #   <string>fb-messenger-share-api</string>
  #   <string>fbauth2</string>
  #   <string>fbapi</string>
  #   <string>fbapi20130214</string>
  #   <string>fbapi20130410</string>
  #   <string>fbapi20130702</string>
  #   <string>fbapi20131010</string>
  #   <string>fbapi20131219</string>
  #   <string>fbapi20140410</string>
  #   <string>fbapi20140116</string>
  #   <string>fbapi20150313</string>
  #   <string>fbapi20150629</string>
  #   <string>fbapi20160328</string>
  #   <string>fbauth</string>
  #   <string>fbshareextension</string>
  # </array>
  # <key>FacebookAutoLogAppEventsEnabled</key>
  # <string>FALSE</string>
  # <key>FacebookAdvertiserIDCollectionEnabled</key>
  # <string>FALSE</string>
  # <key>CFBundleURLTypes</key>
  # <array>
  #   <dict>
  #    <key>CFBundleURLSchemes</key>
  #    <array>
  #      <string>fb1523458767976650</string>
  #    </array>
  #  </dict>
  # </array>