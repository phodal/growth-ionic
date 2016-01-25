angular.module('starter.controllers')
  .controller('SolutionCtrl', function ($scope, $analytics, $ionicFilterBar) {
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
  });
