angular.module('app.AIControl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('AIControl', function ($scope, $ionicModal, $storageServices, $analytics) {
    $analytics.trackView('AI Controller');
    $scope.improves = [];
    $scope.aiTodoLists = TODO_LISTS;
    var todoMenuKeys = Object.keys(TODO_LISTS);

    angular.forEach(todoMenuKeys, function (listsKey) {
      $storageServices.get(listsKey + 'Finish', function (result) {
        if (result !== 'true') {
          $scope.improves.push($scope.aiTodoLists[listsKey]);
        }
      })
    });
  });
