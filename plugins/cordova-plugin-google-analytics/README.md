google-analytics-plugin 
=======================
[![npm](https://img.shields.io/npm/v/cordova-plugin-google-analytics.svg)](https://www.npmjs.com/package/cordova-plugin-google-analytics)
[![npm](https://img.shields.io/npm/dt/cordova-plugin-google-analytics.svg?label=npm%20downloads)](https://www.npmjs.com/package/cordova-plugin-google-analytics)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Cordova (PhoneGap) 3.0+ Plugin to connect to Google's native Universal Analytics SDK

Prerequisites:
* A Cordova 3.0+ project for iOS, Android and/or Windows Phone 8
* A Mobile App property through the Google Analytics Admin Console
* (Android) Google Play Services SDK installed via [Android SDK Manager](https://developer.android.com/sdk/installing/adding-packages.html)

#Installing

This plugin follows the Cordova 3.0+ plugin spec, so it can be installed through the Cordova CLI in your existing Cordova project:
```bash
cordova plugin add https://github.com/danwilson/google-analytics-plugin.git
```

This plugin is also available on npm if you are using Cordova 5.0+:
```bash
cordova plugin add cordova-plugin-google-analytics
```

... OR the Cordova Plugin Registry if you are using a version of Cordova before 5.0 (while it remains open, as it is planning to shut down soon due to the move to npm):
```bash
cordova plugin add com.danielcwilson.plugins.googleanalytics
```

*Important Note* If the latest versions (0.8.0+) of this plugin are not working for you with Android on Cordova 5.0+, please try the suggestions in [Issues 123](https://github.com/danwilson/google-analytics-plugin/issues/123#issuecomment-151145095). Google Play Services has been very confusing to integrate, but in recent months it has been simplified.  This plugin uses the new simpler way (including it as a framework instead of bundling it which can conflict with other plugins bundling it), but if you previously installed this plugin some old files might still be lingering.

The plugin.xml file will add the Google Analytics SDK files for Android, iOS and/or Windows Phone 8.  Follow [Google's steps](#sdk-files) if you need to update these later.  Also make sure to review the Google Analytics [terms](http://www.google.com/analytics/terms/us.html) and [SDK Policy](https://developers.google.com/analytics/devguides/collection/protocol/policy)

If you are not using the CLI, follow the steps in the section [Installing Without the CLI](#nocli)

Windows Phone users have to manually add the [Google Analytics SDK for Windows 8 and Windows Phone](https://googleanalyticssdk.codeplex.com/) to your solution. To do this, just open your Cordova solution in Visual Studio, and add the [GoogleAnalyticsSDK package via NuGet](http://nuget.org/packages/GoogleAnalyticsSDK). This plugin requires v1.3.0 or higher.

#Release note
v1.0.0 -- api change from ```windows.analytics``` to ```windows.ga```

#JavaScript Usage
In your 'deviceready' handler, set up your Analytics tracker:
* `window.ga.startTrackerWithId('UA-XXXX-YY')` where UA-XXXX-YY is your Google Analytics Mobile App property

To track a Screen (PageView):
* `window.ga.trackView('Screen Title')`

To track an Event:
* `window.ga.trackEvent('Category', 'Action', 'Label', Value)` Label and Value are optional, Value is numeric

To track custom metrics:
* `window.ga.trackMetric('key', Value)` Value is optional

To track an Exception:
* `window.ga.trackException('Description', Fatal)` where Fatal is boolean

To track User Timing (App Speed):
* `window.ga.trackTiming('Category', IntervalInMilliseconds, 'Variable', 'Label')` where IntervalInMilliseconds is numeric

To add a Transaction (Ecommerce)
* `window.ga.addTransaction('ID', 'Affiliation', Revenue, Tax, Shipping, 'Currency Code')` where Revenue, Tax, and Shipping are numeric

To add a Transaction Item (Ecommerce)
* `window.ga.addTransactionItem('ID', 'Name', 'SKU', 'Category', Price, Quantity, 'Currency Code')` where Price and Quantity are numeric

To add a Custom Dimension
* `window.ga.addCustomDimension('Key', 'Value', success, error)`
* Key should be integer index of the dimension i.e. send `1` instead of `dimension1` for the first custom dimension you are tracking.
* e.g. `window.analytics.addCustomDimension(1, 'Value', success, error)`

To set a UserId:
* `window.ga.setUserId('my-user-id')`

To set a specific app version:
* `window.ga.setAppVersion('1.33.7')`

To set a anonymize Ip address:
* `window.ga.setAnonymizeIp(true)`

To enabling Advertising Features in Google Analytics allows you to take advantage of Remarketing, Demographics & Interests reports, and more:
* `window.ga.setAllowIDFACollection(true)`

To enable verbose logging:
* `window.ga.debugMode()`

To enable/disable automatic reporting of uncaught exceptions
* `window.ga.enableUncaughtExceptionReporting(Enable, success, error)` where Enable is boolean

#Installing Without the CLI <a name="nocli"></a>
Copy the files manually into your project and add the following to your config.xml files:
```xml
<feature name="UniversalAnalytics">
  <param name="ios-package" value="UniversalAnalyticsPlugin" />
</feature>
```
```xml
<feature name="UniversalAnalytics">
  <param name="android-package" value="com.danielcwilson.plugins.analytics.UniversalAnalyticsPlugin" />
</feature>
```
```xml
<feature name="UniversalAnalytics">
  <param name="wp-package" value="UniversalAnalyticsPlugin" />
</feature>
```
<a name="sdk-files"></a>
You also will need to manually add the Google Analytics SDK files:
* Download the Google Analytics SDK 3.0 for [iOS](https://developers.google.com/analytics/devguides/collection/ios/) and/or [Android](https://developers.google.com/analytics/devguides/collection/android/)
* For iOS, add the downloaded Google Analytics SDK header files and libraries according to the [Getting Started](https://developers.google.com/analytics/devguides/collection/ios/v3) documentation
* For Android, add `libGoogleAnalyticsServices.jar` to your Cordova Android project's `/libs` directory and build path
* For Windows Phone, add the [GoogleAnalyticsSDK package via NuGet](http://nuget.org/packages/GoogleAnalyticsSDK)

#Integrating with Lavaca
The `lavaca` directory includes a component that can be added to a <a href="http://getlavaca.com">Lavaca</a> project.  It offers a way to use the web `analytics.js` when the app is running in the browser and not packaged as Cordova.

* Copy `AnalyticsService.js` to your Lavaca project (I create a directory under `js/app` called `data`).
* In your config files (`local.json`, `staging.json`, `production.js`) create properties called `google_analytics_id` (for the Mobile App UA property) and `google_analytics_web_id` (for the Web UA property) and set the appropriate IDs or leave blank as needed.
* In any file you want to track screen views or events, require AnalyticsService and use the methods provided.

```javascript
var analyticsService = require('app/data/AnalyticsService');

analyticsService.trackView('Home');
```
