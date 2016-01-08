angular.module('starter.services', [])
  .factory('$storageServices', ['$cordovaPreferences', '$window', function ($cordovaPreferences, $window) {
    var localStorage = {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, cb) {
        cb($window.localStorage[key]);
      }
    };

    var preferences = {
      set: function (key, value) {
        $cordovaPreferences.store(key, value)
          .success(function (value) {
            console.log("Success: " + value);
          })
          .error(function (error) {
            console.log("Error: " + error);
          });
      },
      get: function (key, cb) {
        $cordovaPreferences.fetch(key)
          .success(function (value) {
            cb(value);
          })
          .error(function (error) {
            alert("Error: " + error);
          })
      }
    };

    if ($window.cordova) {
      return preferences;
    } else {
      return localStorage;
    }
  }])

  .factory('$analytics', ['$window', function ($window) {
    if (typeof $window.analytics === 'undefined') {
      return {
        trackView: function (view) {
          console.log(view);
        }
      }
    }

    var Analytics = {
      init: function () {
        $window.analytics.startTrackerWithId('UA-71907748-1');
      },
      trackView: function (view) {
        this.init();
        $window.analytics.trackView(view)
      }
    };

    return Analytics;
  }]);
