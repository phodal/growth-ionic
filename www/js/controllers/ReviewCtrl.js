angular.module('app.reviewController', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('ReviewCtrl', function ($scope, $sce, $stateParams, $http, $ionicLoading, marked, $filter) {
    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-71907748-1');
      analytics.trackView('Review')
    }

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
    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-71907748-1');
      analytics.trackView('Review List')
    }
    $scope.reviews = AllReview;
  });
