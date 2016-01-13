angular.module('app.AppControl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('AppCtrl', function ($scope, $storageServices) {
    $scope.badgePoints = 0;
    $storageServices.get('badgePoints', function (points) {
      $scope.badgePoints = points;
    });
  });
