angular.module('starter.controllers')
  .controller('MoreCtrl', function ($scope, $ionicTabsDelegate, $cordovaAppRate, $cordovaSocialSharing, $analytics) {
    $analytics.trackView('More Ctrl');

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
      $cordovaAppRate.navigateToAppStore().then(function (result) {
        $analytics.trackView('More', 'Rate', result);
      });
    };

    $scope.share = function () {
      var growthHomepage = 'http://growth.ren/';
      $cordovaSocialSharing
        .share('我现在使用Growth，这是一款专注于Web开发者成长的应用，涵盖Web开发的流程及技术栈，Web开发的学习路线、成长衡量等各方面。快来下载吧!', '', '', growthHomepage)
        .then(function (result) {
          $analytics.trackView('More', 'Share', result);
        }, function (err) {
          $analytics.trackView('More', 'Share Error', error);
        });
    }
  });
