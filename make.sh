#!/usr/bin/env bash
ionic build android --release --prod
rm ~/repractise/growth/platforms/android/build/outputs/apk/growth.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/phodal.keystore ~/repractise/growth/platforms/android/build/outputs/apk/android-release-unsigned.apk phodal
~/android-sdk/build-tools/24.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk ~/repractise/growth/platforms/android/build/outputs/apk/growth.apk
cp ~/repractise/growth/platforms/android/build/outputs/apk/growth.apk ~/Desktop/growth.apk
