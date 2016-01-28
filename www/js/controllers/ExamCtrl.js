angular.module('starter.controllers')
  .controller('ExamCtrl', function ($scope, $ionicModal) {
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
  });
