#!/usr/bin/env bash
cordova build --release android
rm ~/repractise/growth/platforms/android/build/outputs/apk/growth.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/phodal.keystore ~/repractise/growth/platforms/android/build/outputs/apk/android-release-unsigned.apk phodal
~/android-sdk/build-tools/23.0.1/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk ~/repractise/growth/platforms/android/build/outputs/apk/growth.apk
cp ~/repractise/growth/platforms/android/build/outputs/apk/growth.apk ~/Desktop/growth.apk
