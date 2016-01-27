angular.module('starter.controllers')
  .controller('MainCtrl', function ($scope, $ionicModal, $storageServices, $analytics, $updateServices) {
    if(isAndroid) {
      $updateServices.check('main');
    }

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.badgePoints = 0;
      $storageServices.get('badgePoints', function (points) {
        $scope.badgePoints = points;
      });
    });
  });
