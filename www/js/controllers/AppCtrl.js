angular.module('app.AppControl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('AppCtrl', function ($scope, $storageServices, $updateServices) {

    $updateServices.check('main');
    $scope.badgePoints = 0;
    $scope.$on('$ionicView.enter', function () {
      $storageServices.get('badgePoints', function (points) {
        $scope.badgePoints = points;
      });
    });
  });
