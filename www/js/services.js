angular.module('starter.services', [])

.factory('$localstorage', ['$window', function ($window) {
  return {
    set: function (key, value) {
      $window.localStorage[key] = value;
    },
    get: function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    remove: function (key, defaultValue) {
      return $window.localStorage.removeItem([key]) || defaultValue;
    },
    setObject: function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function (key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

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
      $cordovaPreferences.fetch('key')
        .success(function(value) {
          cb(value);
        })
        .error(function(error) {
          alert("Error: " + error);
        })
    }
  };

  if($window.cordova) {
   return preferences;
  } else {
    return localStorage;
  }
}]);
