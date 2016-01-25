angular.module('starter.controllers')
  .controller('StackCtrl', function ($scope, $analytics, $stateParams) {
    $analytics.trackView('Stack ' + $stateParams.stack + ' List');
    $scope.title = $stateParams.stack;
  });
