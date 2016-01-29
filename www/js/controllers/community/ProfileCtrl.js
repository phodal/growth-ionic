angular.module('starter.controllers')
  .controller('ProfileCtrl', function ($scope, Users, $stateParams) {
    Users.get({id: $stateParams.id}).$promise.then(function (response) {
      $scope.userId = response.data.id;
      $scope.userInfo = response.data.attributes;
      $scope.addInfo = response.included;
    });
  });
