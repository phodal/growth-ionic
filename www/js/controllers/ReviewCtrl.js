angular.module('app.reviewController', ['hljs', 'starter.utils'])
  .controller('ReviewCtrl', function ($scope, $sce, $stateParams, $http, $ionicLoading, marked, $filter, $analytics) {
    $analytics.trackView('Review');

    $ionicLoading.show({
      animation: 'fade-in',
      template: 'Loading...'
    });
    $http({
      method: 'GET',
      url: 'assets/review/' + $stateParams.slug + '.md'
    }).success(function (response) {
      $ionicLoading.hide();
      $scope.title = $filter('filter')(BOOK_REVIEWS, {"slug": $stateParams.slug})[0].title;
      $scope.htmlContent = $sce.trustAsHtml(marked(response))
    }).error(function (data, status) {
      alert(data + status);
    });
  })

  .controller('ReviewListCtrl', function ($scope, $analytics) {
    $analytics.trackView('Review List');

    $scope.reviews = BOOK_REVIEWS;
  });
