angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope) {

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

  .controller('DayCtrl1', function ($scope, $ionicModal) {
    $scope.currentModal = null;
    $scope.currentModals = [];

    $scope.openSpecialModal = function (subtopic, branch) {
      $ionicModal.fromTemplateUrl('templates/modal/day1/' + subtopic + '/' + branch + '.html', {
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

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope
    // and removing the scope from its parent.
    $scope.$on('$destroy', function () {
      for (var modal in $scope.currentModals) {
        console.log(modal);
        modal.remove();
      }
    });
  })


  .controller('DayCtrl2', function ($scope) {

  })

  .controller('DayCtrl3', function ($scope) {

  })

  .controller('DayCtrl4', function ($scope) {

  })
  .controller('DayCtrl5', function ($scope) {

  })
  .controller('DayCtrl6', function ($scope) {

  })
  .controller('DayCtrl7', function ($scope) {

  });
