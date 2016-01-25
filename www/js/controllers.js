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
  })

  .controller('StackCtrl', function ($scope, $analytics, $stateParams) {
    $analytics.trackView('Stack ' + $stateParams.stack + ' List');
    $scope.title = $stateParams.stack;
  })

  .controller('SettingCtrl', function ($scope, $analytics, $storageServices, $translate) {
    $analytics.trackView('Setting Ctrl');
    $scope.language = {checked: false};
    $scope.optionSelected = 'zh-cn';
    $storageServices.get('language', function (result) {
      if (result !== undefined) {
        $scope.optionSelected = result;
      }
    });

    $scope.updateLanguages = function (optionSelected) {
      $storageServices.set('language', optionSelected);
      $translate.use(optionSelected);
    };
  });
