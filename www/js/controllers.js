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

  .controller('AllQuizCtrl', function ($scope, $stateParams, $timeout, $http, quizFactory, utilsFactory) {
    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-71907748-1');
      analytics.trackView('Quiz Game' + $stateParams.slug);
    }

    $scope.isQuestioning = false;
    $scope.isFirst = true;
    $scope.questions = [];
    $scope.title = $stateParams.slug;
    $http.get('quiz/' + $stateParams.slug + '.json').then(function (response) {
      $scope.questions = response.data;
    });

    $scope.getQuestion = function () {
      $scope.isQuestioning = true;
      $scope.isFirst = false;
      var quiz_id = utilsFactory.getRandomInt($scope.questions.length);
      $scope.question = $scope.questions[quiz_id];
      $scope.counter = 30;
      $scope.onTimeout = function () {
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
        if ($scope.counter <= 0) {
          $scope.stop();
        }
      };

      var mytimeout = $timeout($scope.onTimeout, 1000);

      $scope.stop = function () {
        $timeout.cancel(mytimeout);
      }
    };
  })

  .controller('AdvancedQuizCtrl', function ($scope, $stateParams, $timeout, $http, quizFactory, utilsFactory, $sce, marked) {
    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-71907748-1');
      analytics.trackView('Advanced Quiz Game' + $stateParams.slug);
    }

    $scope.isQuestioning = false;
    $scope.isFirst = true;
    $scope.title = $stateParams.slug;
    $http.get('advancedQuiz/' + $stateParams.slug + '.json').then(function (response) {
      $scope.questionSize = response.data[$stateParams.slug].size
    });

    $scope.getQuestion = function () {
      $scope.isQuestioning = true;
      $scope.isFirst = false;
      var quiz_id = utilsFactory.getRandomInt($scope.questionSize);
      $http.get('advancedQuiz/' + $stateParams.slug + '/' + quiz_id + '.md').then(function (response) {
        $scope.question = $sce.trustAsHtml(marked(response.data));
      });
    };
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
