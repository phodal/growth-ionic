angular.module('app.AIControl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('AIControl', function ($scope, $ionicModal, $storageServices, $analytics) {
    $analytics.trackView('AI Controller');

  });
