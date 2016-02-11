angular.module('starter.controllers')
  .controller('SettingCtrl', function ($scope, $analytics, $storageServices, $translate, amMoment, $updateServices, $cordovaAppVersion) {
    $analytics.trackView('Setting Ctrl');
    $scope.language = {checked: false};
    $scope.optionSelected = 'zh-cn';
    $storageServices.get('language', function (result) {
      if (result !== undefined) {
        $scope.optionSelected = result;
      }
    });

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
    };

    $scope.isIOS = isIOS;

    $scope.updateLanguages = function (optionSelected) {
      $storageServices.set('language', optionSelected);
      amMoment.changeLocale(optionSelected);
      $translate.use(optionSelected);
    };
  });
