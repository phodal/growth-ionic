angular.module('app.AchievementCtrl', ['hljs', 'starter.utils'])
  .controller('AchievementCtrl', function ($scope, $ionicModal, $storageServices, $analytics, $translate) {
    $analytics.trackView('Achievement Controller');
    $scope.achievements = [];
    $scope.todoMenus = TODO_LISTS[$translate.use()];
    var todoMenuKeys = Object.keys(TODO_LISTS[$translate.use()]);

    angular.forEach(todoMenuKeys, function (listsKey) {
      var lsKey = listsKey + 'Finish';
      console.log(lsKey);
      $storageServices.get(lsKey, function (result) {
        if (result === 'true') {
          if ($scope.todoMenus[listsKey].achievement !== undefined) {
            $scope.achievements.push($scope.todoMenus[listsKey].achievement);
          }
        }
      })
    });
  });
