angular.module('app.AIControl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('AIControl', function ($scope, $ionicModal, $storageServices, $analytics, $http, $ionicLoading, utilsFactory, $translate) {
    $analytics.trackView('AI Controller');
    $ionicLoading.show({
      template: 'Computing...'
    });

    $scope.improves = [];
    $scope.goodSkills = [];
    $scope.aiTodoLists = TODO_LISTS[$translate.use()];
    var todoMenuKeys = Object.keys(TODO_LISTS[$translate.use()]);

    angular.forEach(todoMenuKeys, function (listsKey) {
      $storageServices.get(listsKey + 'Finish', function (result) {
        if (result !== 'true') {
          var todoItems = $scope.aiTodoLists[listsKey].basic;
          var suggest = todoItems[utilsFactory.getRandomInt(todoItems.length)];
          $scope.improves.push(suggest);
        } else if (result === 'true') {
          $scope.goodSkills.push(listsKey);
        }
      });
    });

    var skills = {
      server: 0,
      front: 0,
      devops: 0,
      coding: 0,
      analytics: 0
    };

    if ($scope.goodSkills.indexOf('front') !== -1) {
      skills.front = 5;
    }

    if ($scope.goodSkills.indexOf('mvc') !== -1) {
      skills.server = 5;
    }

    if ($scope.goodSkills.indexOf('refactor') !== -1) {
      skills.coding = 5;
    }

    if ($scope.goodSkills.indexOf('analytics') !== -1) {
      skills.analytics = 5;
    }

    if ($scope.goodSkills.indexOf('container') !== -1 && $scope.goodSkills.indexOf('ci') !== -1) {
      skills.devops = 5;
    }

    $http.get('assets/rules/rules.nools').then(function (response) {
      var flow;
      if (nools.getFlow("AI Flow") === undefined) {
        flow = nools.compile(response.data, {
          name: 'AI Flow'
        });
      } else {
        flow = nools.getFlow("AI Flow");
      }

      var SkillCal = flow.getDefined("skillcal");

      var originSuggestions = "你是一个";
        $scope.finallyWords = originSuggestions;

      var session = flow.getSession(new SkillCal(skills))
        .on("modify", function (fact) {
          $scope.finallyWords += fact.text;
        })
        .on("fire", function (ruleName) {
          console.log('AI Analytics: ' + ruleName);
        });

      session.match(function (err) {
        if($scope.finallyWords === originSuggestions) {
          $scope.finallyWords = "你是一个有潜力的新星!";
        }

        $ionicLoading.hide();
        if (err) {
          console.error(err.stack);
        } else {
          console.log("AI Analytics: done");
        }
      });
    });
  });
