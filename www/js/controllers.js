angular.module('starter.controllers', ['starter.factory', 'hljs', 'starter.utils'])

  .controller('AppCtrl', function ($scope) {
  })

  .controller('skillTreeControl', function ($scope, $storageServices) {
    $scope.$on('$ionicView.enter', function () {
      $scope.learnedSkills = [];
      angular.forEach(AllSkills, function (skills) {
        angular.forEach(skills, function (skill) {
          $storageServices.get(skill.text, function (result) {
            var rating = parseInt(result);
            if (rating && rating >= 3) {
              $scope.learnedSkills.push({
                skill: skill.text,
                rating: rating
              });
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

  .controller('LevelSelectCtrl', function ($scope) {
    $scope.levels = [
      {title: 'Level 1', id: 1},
      {title: 'Level 2', id: 2},
      {title: 'Level 3', id: 3},
      {title: 'Level 4', id: 4}
    ];
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

  .controller('QuizCtrl', function ($scope, $stateParams, $http, quizFactory, utilsFactory) {
    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-71907748-1');
      analytics.trackView('Quiz Game')
    }

    $scope.userAnswer = {};
    $scope.level = $stateParams.level;
    $http.get('assets/data/lv' + $stateParams.level + '.json').then(function (data) {
      $scope.level_langeuages = data.data;
    });

    $scope.start = function () {
      $scope.id = 0;
      $scope.score = 0;
      $scope.inProgress = true;
      $scope.getQuestion();
    };

    $scope.reset = function () {
      $scope.inProgress = false;
      $scope.score = 0;
    };

    $scope.getQuestion = function () {
      var language_id = utilsFactory.getRandomInt($scope.level_langeuages.length);
      var correct_language = $scope.level_langeuages[language_id].language;

      quizFactory.myService.async('lv' + $scope.level, correct_language).then(function (data) {
        $scope.data = data;
      }).then(function () {
        var firstLanguage_id = utilsFactory.getRandomIntWithout($scope.level_langeuages.length, language_id);
        var firstLanguage = $scope.level_langeuages[firstLanguage_id].language;
        var secondLanguage_id = utilsFactory.getRandomIntWithoutArray($scope.level_langeuages.length, [firstLanguage_id, language_id]);
        var secondLanguage = $scope.level_langeuages[secondLanguage_id].language;

        var options_language = utilsFactory.shuffle([firstLanguage.split('.')[0], correct_language.split('.')[0], secondLanguage.split('.')[0]]);
        $scope.answer = -1;
        var answerWithIndex = [];
        angular.forEach(options_language, function (language, index) {
          answerWithIndex.push({
            language: language,
            value: index
          });

          if (language === correct_language.split('.')[0]) {
            $scope.answer = index;
          }
        });

        var q = {
          question: $scope.data,
          options: answerWithIndex,
          answer: $scope.answer
        };
        if (q) {
          $scope.question = q.question;
          $scope.options = q.options;
          $scope.answer = q.answer;
          $scope.answerMode = true;
          $scope.wiki_url = 'lv' + $stateParams.level + '+' + correct_language;
          $scope.correct_language = correct_language.split('.')[0];
        } else {
          $scope.quizOver = true;
        }
      });
    };

    $scope.checkAnswer = function () {
      if ($scope.userAnswer === -1) return;
      var ans = $scope.userAnswer.value;
      if (ans === $scope.answer) {
        $scope.score++;
        $scope.correctAns = true;
      } else {
        $scope.correctAns = false;
      }

      $scope.answerMode = false;
    };

    $scope.nextQuestion = function () {
      $scope.id++;
      $scope.getQuestion();
    };

    $scope.reset();
  })

  .controller('WikiCtrl', function ($scope, $stateParams, $http) {
    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-71907748-1');
      analytics.trackView('WiKi List')
    }
    $scope.level = $stateParams.level;
    $http.get('assets/data/results.json').then(function (data) {
      var results = [];
      angular.forEach(data.data, function (each_level) {
        angular.forEach(each_level, function (each_language) {
          var language = each_language.language.split('.')[0];
          angular.extend(each_language, {'language_name': language});
          results.push(each_language)
        });
      });
      $scope.languages = results;
    });
  })

  .controller('WikiDetailCtrl', function ($scope, $stateParams, quizFactory, $http) {
    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-71907748-1');
      analytics.trackView('WiKi Detail')
    }
    if (typeof analytics !== 'undefined') {
      analytics.trackView("WikiDetailCtrl");
    }
    var language_info = $stateParams.language_info.split("+"),
      level = language_info[0],
      file_name = language_info[1],
      language = file_name.split('.')[0];

    $scope.language = language;
    $scope.md = 'assets/intro/' + language + '.md';

    $http.get('assets/' + level + '/' + file_name).then(function (data) {
      $scope.hello_world = data.data;
    });
  })

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
  })

  .controller('DayCtrl', function ($scope, $ionicModal, $storageServices) {
    if (typeof analytics !== 'undefined') {
      analytics.startTrackerWithId('UA-71907748-1');
      analytics.trackView('Day Ctrl List')
    }
    $scope.currentModal = null;
    $scope.currentModals = [];

    $scope.openSpecialModal = function (subtopic, branch) {
      if (typeof analytics !== 'undefined') {
        analytics.startTrackerWithId('UA-71907748-1');
        analytics.trackView('modal ' + subtopic + ' ' + branch)
      }
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

    $scope.getSkill = function (subtopic) {
      $scope.devList = [];
      var devLists = AllSkills[subtopic];

      angular.forEach(devLists, function (skill) {
        $storageServices.get(skill.text, function (value) {
          var rating = parseInt(value);
          $scope.devList.push({
            rating: rating,
            max: 5,
            text: skill.text
          });
        });
      });

      $ionicModal.fromTemplateUrl('templates/skills/skill.html', {
        id: subtopic,
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        modal.show();
        $scope.currentModal = modal;
        $scope.currentModals.push(modal);
      });

      $scope.submitSkill = function () {
        angular.forEach($scope.devList, function (skill) {
          $storageServices.set(skill.text, skill.rating);
        });
      }
    };

    $scope.$on('modal.shown', function (event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function (event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals
    $scope.$on('$destroy', function () {
      angular.forEach($scope.currentModals, function (modal) {
        modal.remove();
      });
    });
  });
