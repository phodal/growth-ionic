angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope) {

  })

  .controller('BlogCtrl', function ($scope) {

  })

  .controller('DayCtrl1', function ($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/modal/tree.html', {
      id: '1',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('templates/modal/book.html', {
      id: '2',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) {
        $scope.oModal1.show();
      } else {
        $scope.oModal2.show();
      }
    };

    $scope.closeModal = function(index) {
      if (index == 1) {
        $scope.oModal1.hide();
      } else {
        $scope.oModal2.hide();
      }
    };

    $scope.$on('modal.shown', function(event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function(event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });
  })

  .controller('SearchCtrl', function ($scope) {

  });
