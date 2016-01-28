angular.module('starter.controllers')
  .controller('MainCtrl', function ($scope, $ionicModal, $storageServices, $analytics, $updateServices, $ionicTabsDelegate) {
    if(isAndroid) {
      $updateServices.check('main');
    }

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
