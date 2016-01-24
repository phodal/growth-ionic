angular.module('starter.controllers')
  .controller('CommunityCtrl', function ($scope, Topics) {
    Topics.refresh().$promise.then(function (response) {
      $scope.topics = response.data;
    });
    $scope.doRefresh = function () {
      $scope.topics = Topics.refresh();
    }
  });
