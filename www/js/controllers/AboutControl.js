angular.module('starter.controllers')
  .controller('AboutCtrl', function ($scope, $analytics, $updateServices, $cordovaAppVersion) {
    $analytics.trackView('About Ctrl');
    $scope.isAndroid = isAndroid;
    $scope.isApp = window.cordova !== undefined;
    $scope.version = '0.0.0';
    if (window.cordova && !isWindowsPhone) {
      $cordovaAppVersion.getVersionNumber().then(function (version) {
        $scope.version = version;
      });
    }
    $scope.update = function () {
      $updateServices.check();
    }
  });
