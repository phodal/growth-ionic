angular.module('starter.controllers')
  .controller('CommunityCtrl', function ($scope, Topics) {
    Topics.refresh().$promise.then(function (response) {
      $scope.topics = response.data;
      $scope.included = response.included;
    });
    $scope.doRefresh = function () {
      Topics.refresh().$promise.then(function (response) {
        $scope.topics = response.data;
        $scope.included = response.included;
      });
    };
    $scope.getUserInfo = function (a) {
      console.log(a);
      return 'http://forum.growth.ren/assets/avatars/cnhnl3phpl8otwkh.jpg';
    }
  });
