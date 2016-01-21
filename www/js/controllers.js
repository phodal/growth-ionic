
angular.module('starter.controllers', ['starter.factory', 'starter.services', 'hljs', 'starter.utils'])
  .controller('AboutCtrl', function ($scope, $analytics, $updateServices, $cordovaAppVersion) {
    $analytics.trackView('About Ctrl');
    $scope.isAndroid = isAndroid;
    $scope.isApp = window.cordova !== undefined;
    $scope.version = '0.0.0';
    if (window.cordova && !isWindowsPhone) {
      $cordovaAppVersion.getVersionNumber().then(function (version) {
        $scope.version = version;
      });
    }
    $scope.update = function () {
      $updateServices.check();
    }
  })

  .controller('SolutionCtrl', function ($scope, $analytics, $ionicFilterBar) {
    $analytics.trackView('Solution Ctrl');
    var filterBarInstance;
    $scope.solutions = SOLUTIONS;
    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.solutions,
        update: function (filteredItems, filterText) {
          $scope.solutions = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };
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
      url: 'assets/article/' + $stateParams.slug + '.md'
    }).success(function (response) {
      $ionicLoading.hide();
      $scope.EditArticle = function () {
        window.open('https://github.com/phodal/growth/edit/master/www/assets/article/' + $stateParams.slug + '.md', '_system', 'location=yes');
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
  })

  .controller('StackCtrl', function ($scope, $analytics, $stateParams) {
    $analytics.trackView('Stack ' + $stateParams.stack + ' List');
    $scope.title = $stateParams.stack;
  })

  .controller('SettingCtrl', function ($scope, $analytics, $storageServices, $translate) {
    $analytics.trackView('Setting Ctrl');
    $scope.language = {checked: false};
    $scope.optionSelected = 'zh-cn';
    $storageServices.get('language', function (result) {
      if (result !== undefined) {
        $scope.optionSelected = result;
      }
    });
    $scope.selectUpdated = function(optionSelected) {
      $storageServices.set('language', optionSelected);
      $translate.use(optionSelected);
    };
  });
