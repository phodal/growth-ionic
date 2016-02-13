angular.module('starter.controllers')
  .controller('CommunityCtrl', function ($scope, Discussions, $http, $state, $rootScope, $ionicTabsDelegate, $analytics) {
    $analytics.trackView('Community Ctrl');

    $scope.$on('$ionicView.beforeEnter', function () {
      if ($rootScope.userId) {
        $scope.isLogin = true;
      }
    });

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
    $scope.getFirstChar = function (str) {
      var result = "?";
      if (str) {
        result = str.charAt(0).toUpperCase();
      }
      return result;
    };
    Discussions.all().$promise.then(function (response) {
      $scope.topics = response.data;
      $scope.included = response.included;
    });
    $scope.doRefresh = function () {
      Discussions.all().$promise.then(function (response) {
        $scope.topics = response.data;
        $scope.included = response.included;
      }).finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      })
    };
  });
