angular.module('app.AchievementCtrl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('AchievementCtrl', function ($scope, $ionicModal, $storageServices, $analytics) {
    $analytics.trackView('Achievement Controller');

  });
