angular.module('app.quizController', ['starter.factory', 'hljs', 'starter.utils'])

  .controller('AllQuizCtrl', function ($scope, $stateParams, $timeout, $http, quizFactory, utilsFactory, $analytics) {
    $analytics.trackView('Quiz Game ' + $stateParams.slug);

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

  .controller('AdvancedQuizCtrl', function ($scope, $stateParams, $timeout, $http, quizFactory, utilsFactory, $sce, marked, $analytics) {
    $analytics.trackView('Advanced Quiz Game ' + $stateParams.slug);

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
  });
