angular.module('starter.controllers')
  .controller('ExamCtrl', function ($scope, $ionicModal, $ionicTabsDelegate, $analytics) {
    $analytics.trackView('Exam Detail');
    $scope.showHelp = function() {
      $ionicModal.fromTemplateUrl('templates/help/exam.html', {
        id: 'help',
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.helpModal = modal;
      });
    };
    $scope.closeHelpModal = function () {
      $scope.helpModal.hide();
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
