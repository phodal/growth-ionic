angular.module('app.AppControl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('AppCtrl', function ($scope, $storageServices, $updateServices) {
    $scope.badgePoints = 0;
    $scope.$on('$ionicView.afterEnter', function () {
      $updateServices.check('main');
      $storageServices.get('badgePoints', function (points) {
        $scope.badgePoints = points;
      });
    });
  });
