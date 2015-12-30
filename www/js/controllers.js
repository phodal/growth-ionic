angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope) {

  })

  .controller('BlogCtrl', function ($scope) {

  })
  .controller('DayCtrl1', function ($scope, $ionicModal) {
    $scope.currentModal = null;
    $scope.currentModals = [];

    $scope.openSpecialModal = function (subtopic, branch) {
      $ionicModal.fromTemplateUrl('templates/modal/day1/' + subtopic + '/' + branch + '.html', {
        id: subtopic  + '-' + branch,
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.currentModal = modal;
        $scope.currentModals.push(modal);
      });
    };

    $scope.closeSpecialModal = function () {
      $scope.currentModal.hide();
    };

    $scope.$on('modal.shown', function (event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function (event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope
    // and removing the scope from its parent.
    $scope.$on('$destroy', function () {
      console.log('Destroying modals...');
      console.log($scope.currentModals);
      for(var modal in $scope.currentModals) {
        modal.remove();
      }
    });
  })


  .controller('DayCtrl2', function ($scope) {

  })

  .controller('DayCtrl3', function ($scope) {

  })

  .controller('DayCtrl4', function ($scope) {

  })
  .controller('DayCtrl5', function ($scope) {

  })
  .controller('DayCtrl6', function ($scope) {

  })
  .controller('DayCtrl7', function ($scope) {

  });
