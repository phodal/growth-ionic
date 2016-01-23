angular.module('app.MainCtrl', ['hljs', 'starter.utils'])
  .controller('MainCtrl', function ($scope, $ionicModal, $storageServices, $analytics, $ionicPopover, $updateServices) {
    if(isAndroid) {
      $updateServices.check('main');
    }

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.badgePoints = 0;
      $storageServices.get('badgePoints', function (points) {
        $scope.badgePoints = points;
      });

      $storageServices.get('isFirstTime', function (value) {
        if (value !== 'false') {
          $ionicModal.fromTemplateUrl('templates/intro/intro.html', {
            id: 'intro1',
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            modal.show();
            $scope.modal = modal;
          });

          $scope.$on('modal.hidden', function () {
            $storageServices.set('isFirstTime', 'false');
          });
        }
      });
    });

    $scope.$on('$ionicView.afterEnter', function () {
      $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });
    })
  });
