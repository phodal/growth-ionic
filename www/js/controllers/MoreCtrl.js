angular.module('starter.controllers')
  .controller('MoreCtrl', function ($scope, $ionicTabsDelegate, $cordovaAppRate) {
    $scope.goForward = function () {
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1) {
        $ionicTabsDelegate.select(selected + 1);
      }
    };

    $scope.goBack = function () {
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1 && selected != 0) {
        $ionicTabsDelegate.select(selected - 1);
      }
    };

    $scope.rating = function () {
      $cordovaAppRate.promptForRating(true).then(function (result) {
        // success
      });
    }
  });
