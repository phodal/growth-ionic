angular.module('app.quizController', ['starter.factory', 'hljs', 'starter.utils', 'ionic.contrib.ui.tinderCards'])

  .controller('CardCtrl', function ($scope, TDCardDelegate) {
    $scope.cardSwipedLeft = function (index) {
      $scope.addCard();
    };
    $scope.cardSwipedRight = function (index) {
      $scope.addCard();
    };
  })

  .controller('AllQuizCtrl', function ($scope, $stateParams, $timeout, $http, quizFactory, utilsFactory, $analytics) {
    $analytics.trackView('Quiz Game ' + $stateParams.slug);

    $scope.isQuestioning = false;
    $scope.isFirst = true;
    $scope.questions = [];
    $scope.title = $stateParams.slug;
    $http.get('quiz/' + $stateParams.slug + '.json').then(function (response) {
      $scope.originQuestions = utilsFactory.shuffle(response.data);
      $scope.questions = [];
      angular.forEach($scope.originQuestions, function(question, index){
        $scope.questions.push({
          id: index,
          question: question
        })
      });

      $scope.cardDestroyed = function (index) {
        $scope.cards.splice(index, 1);
      };

      $scope.addCard = function () {
        var newCard = $scope.questions[Math.floor(Math.random() * $scope.questions.length)];
        newCard.id = Math.random();
        $scope.cards.unshift(angular.extend({}, newCard));
      };

      $scope.cards = [];
      for (var i = 0; i < 10; i++) {
        $scope.addCard();
      }
    });
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
