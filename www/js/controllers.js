angular.module('starter.controllers', ['starter.factory', 'hljs', 'starter.utils'])

  .controller('AppCtrl', function ($scope) {
  })

  .controller('AboutCtrl', function ($scope) {
    $scope.isApp = false;
    if(window.cordova !== undefined){
      $scope.isApp = true;
    }
  })

  .controller('skillTreeControl', function ($scope, $storageServices) {
    $scope.ratings = 0;
    $scope.isInfinite = false;
    $scope.$on('$ionicView.enter', function () {
      $scope.learnedSkills = [];
      angular.forEach(AllSkills, function (skills) {
        angular.forEach(skills, function (skill) {
          $storageServices.get(skill.text, function (result) {
            var rating = parseInt(result);

            if (rating){
              $scope.ratings = $scope.ratings + rating;
              if(rating >= 3) {
                $scope.learnedSkills.push({
                  skill: skill.text,
                  rating: rating
                });
              }
              if($scope.ratings > 100){
                $scope.isInfinite = true;
              }
            }
          })
        });
      });
    });
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
          // is available
        }, function () {
          // not available
        });


        var email = {
          to: 'h@phodal.com',
          subject: '关于《Growth Ren》',
          body: '',
          isHtml: true
        };

        $cordovaEmailComposer.open(email).then(null, function () {
          // user cancelled email
        });
      }
    }
  })

  .controller('ArticleCtrl', function ($scope, $sce, $stateParams, $http, $ionicLoading, marked, $filter) {
    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-71907748-1');
      analytics.trackView('Article Detail')
    }
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

  .controller('ArticleListCtrl', function ($scope) {
    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-71907748-1');
      analytics.trackView('Article List')
    }
    $scope.articles = AllArticle;
  });
