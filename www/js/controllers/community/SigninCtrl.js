angular.module('starter.controllers')
  .controller('SigninCtrl', function ($scope, $state, $translate) {
    $scope.user = {
      username: '',
      password : ''
    };
    $scope.signIn = function(form) {
      console.log(form);
    };

  });
