angular.module('starter.controllers')
  .controller('SolutionCtrl', function ($scope, $analytics, $ionicFilterBar, $ionicTabsDelegate) {
    $analytics.trackView('Solution Ctrl');
    var filterBarInstance;
    $scope.solutions = SOLUTIONS;
    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.solutions,
        update: function (filteredItems, filterText) {
          $scope.solutions = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };

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
    }
  });
