angular.module('starter.controllers')
  .controller('SettingCtrl', function ($scope, $analytics, $storageServices, $translate, amMoment) {
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
      amMoment.changeLocale(optionSelected);
      $translate.use(optionSelected);
    };
  });
