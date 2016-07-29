#!/usr/bin/env bash
cordova build --release android
rm ~/learing/growth2/platforms/android/build/outputs/apk/growth.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/phodal.keystore ~/learing/growth2/platforms/android/build/outputs/apk/android-release-unsigned.apk phodal
~/android-sdk/build-tools/22.0.0/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk ~/learing/growth2/platforms/android/build/outputs/apk/growth.apk
cp ~/learing/growth2/platforms/android/build/outputs/apk/growth.apk ~/Desktop/growth.apk
