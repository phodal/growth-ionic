angular.module('starter.controllers', ['starter.factory', 'hljs', 'starter.utils'])

  .controller('AppCtrl', function ($scope, $storageServices) {
    $scope.badgePoints = 0;
    $scope.$on('$ionicView.enter', function () {
      $storageServices.get('badgePoints', function (points) {
        $scope.badgePoints = points;
      });
    });
  })

  .controller('AboutCtrl', function ($scope, $analytics) {
    $analytics.trackView('About Ctrl');
    $scope.isApp = window.cordova !== undefined;
  })

  .controller('MainCtrl', function ($scope, $analytics) {

  })

  .controller('FeedbackCtrl', function ($scope, $http, $cordovaEmailComposer) {
    $scope.issues = [];
    $http.get('https://api.github.com/repos/phodal/growth/issues').then(function (response) {
      $scope.issues = response.data;
    });

    $scope.OpenIssue = function (url) {
      window.open(url, '_system', 'location=yes');
    };

    if (window.cordova) {
      $scope.sendMail = function () {
        $cordovaEmailComposer.isAvailable().then(function () {
        }, function () {
        });
        var email = {to: 'h@phodal.com', subject: '关于《Growth Ren》', body: '', isHtml: true};
        $cordovaEmailComposer.open(email).then(null, function () {
        });
      }
    }
  })

  .controller('ArticleCtrl', function ($scope, $sce, $stateParams, $http, $ionicLoading, marked, $filter, $analytics) {
    $analytics.trackView('Article Detail');

    $ionicLoading.show({
      animation: 'fade-in',
      template: 'Loading...'
    });
    $http({
      method: 'GET',
      url: 'article/' + $stateParams.slug + '.md'
    }).success(function (response) {
      $ionicLoading.hide();
      $scope.EditArticle = function () {
        window.open('https://github.com/phodal/growth/edit/master/www/article/' + $stateParams.slug + '.md', '_system', 'location=yes');
      };
      $scope.title = $filter('filter')(AllArticle, {"slug": $stateParams.slug})[0].title;
      $scope.htmlContent = $sce.trustAsHtml(marked(response))
    }).error(function (data, status) {
      alert(data + status);
    });
  })

  .controller('ArticleListCtrl', function ($scope, $analytics) {
    $analytics.trackView('Article List');
    $scope.articles = AllArticle;
  });
