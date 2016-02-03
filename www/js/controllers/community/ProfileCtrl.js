angular.module('starter.controllers')
  .controller('ProfileCtrl', function ($scope, Users, $stateParams, $analytics) {
    $analytics.trackView('Community Profile Ctrl');

    Users.get({id: $stateParams.id}).$promise.then(function (response) {
      $scope.userId = response.data.id;
      $scope.userInfo = response.data.attributes;
      $scope.addInfo = response.included;
    });

    $scope.getFirstChar = function (str) {
      var result = "?";
      if (str) {
        result = str.charAt(0).toUpperCase();
      }
      return result;
    }
  });
