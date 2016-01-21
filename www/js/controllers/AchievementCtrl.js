angular.module('app.AchievementCtrl', ['hljs', 'starter.utils'])
  .controller('AchievementCtrl', function ($scope, $ionicModal, $storageServices, $analytics) {
    $analytics.trackView('Achievement Controller');
    $scope.achievements = [];
    $scope.todoMenus = TODO_LISTS;
    var todoMenuKeys = Object.keys(TODO_LISTS);

    angular.forEach(todoMenuKeys, function (listsKey) {
      $storageServices.get(listsKey + 'Finish', function (result) {
        if (result === 'true') {
          if ($scope.todoMenus[listsKey].achievement !== undefined) {
            $scope.achievements.push($scope.todoMenus[listsKey].achievement);
          }
        }
      })
    });
  });
