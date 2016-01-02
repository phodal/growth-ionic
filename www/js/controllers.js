angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope) {

  })

  .controller('ReviewCtrl', function ($scope, $sce, $stateParams, $http, $ionicLoading, marked, $filter) {
    $ionicLoading.show({
      animation: 'fade-in',
      template: 'Loading...'
    });
    $http({
      method: 'GET',
      url: 'review/' + $stateParams.slug + '.md'
    }).success(function (response) {
      $ionicLoading.hide();
      $scope.title = $filter('filter')(AllReview, {"slug": $stateParams.slug})[0].title;
      $scope.htmlContent = $sce.trustAsHtml(marked(response))
    }).error(function (data, status) {
      alert(data + status);
    });
  })

  .controller('ReviewListCtrl', function ($scope) {
    $scope.reviews = AllReview;
  })

  .controller('ArticleCtrl', function ($scope, $sce, $stateParams, $http, $ionicLoading, marked, $filter) {
    $ionicLoading.show({
      animation: 'fade-in',
      template: 'Loading...'
    });
    $http({
      method: 'GET',
      url: 'article/' + $stateParams.slug + '.md'
    }).success(function (response) {
      $ionicLoading.hide();
      $scope.title = $filter('filter')(AllArticle, {"slug": $stateParams.slug})[0].title;
      $scope.htmlContent = $sce.trustAsHtml(marked(response))
    }).error(function (data, status) {
      alert(data + status);
    });
  })

  .controller('ArticleListCtrl', function ($scope) {
    $scope.articles = AllArticle;
  })

  .controller('DayCtrl', function ($scope, $ionicModal) {
    $scope.currentModal = null;
    $scope.currentModals = [];

    $scope.openSpecialModal = function (subtopic, branch) {
      $ionicModal.fromTemplateUrl('templates/modal/' + subtopic + '/' + branch + '.html', {
        id: subtopic + '-' + branch,
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.currentModal = modal;
        $scope.currentModals.push(modal);
      });
    };

    $scope.closeSpecialModal = function () {
      $scope.currentModal.hide();
    };

    $scope.$on('modal.shown', function (event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function (event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals
    $scope.$on('$destroy', function () {
      angular.forEach($scope.currentModals, function(modal){
        modal.remove();
      });
    });
  });
