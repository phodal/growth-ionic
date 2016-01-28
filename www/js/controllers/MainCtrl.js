angular.module('starter.controllers')
  .controller('MainCtrl', function ($scope, $ionicModal, $storageServices, $analytics, $updateServices, $ionicTabsDelegate, $translate) {
    if(isAndroid) {
      $updateServices.check('main');
    }

    $translate('day1').then(function (translation) {
      console.log(translation)
    });

    $scope.days = [1 ,2, 3, 4, 5, 6, 7];
    $scope.getDay = function (index) {
      return "day" + index
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.badgePoints = 0;
      $storageServices.get('badgePoints', function (points) {
        $scope.badgePoints = points;
      });
    });

    $scope.goForward = function () {
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1) {
        $ionicTabsDelegate.select(selected + 1);
      }
    };

    $scope.goBack = function () {
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1 && selected != 0) {
        $ionicTabsDelegate.select(selected - 1);
      }
    }
  });
