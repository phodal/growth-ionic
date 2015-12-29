angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope) {

  })

  .controller('BlogCtrl', function ($scope) {

  })

  .controller('DayCtrl1', function ($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/modal/tree.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.contacts = [
      {name: 'Gordon Freeman'},
      {name: 'Barney Calhoun'},
      {name: 'Lamarr the Headcrab'}
    ];

    $scope.createContact = function (u) {
      $scope.contacts.push({name: u.firstName + ' ' + u.lastName});
      $scope.modal.hide();
    };
  })

  .controller('SearchCtrl', function ($scope) {

  });
