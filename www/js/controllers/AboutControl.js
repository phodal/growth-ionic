angular.module('starter.controllers')
  .controller('AboutCtrl', function ($scope, $analytics) {
    $analytics.trackView('About Ctrl');
  });
