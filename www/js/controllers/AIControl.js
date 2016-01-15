angular.module('app.AIControl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('AIControl', function ($scope, $ionicModal, $storageServices, $analytics, $http) {
    $analytics.trackView('AI Controller');

    $scope.improves = [];
    $scope.goodSkills = [];
    $scope.aiTodoLists = TODO_LISTS;
    var todoMenuKeys = Object.keys(TODO_LISTS);

    angular.forEach(todoMenuKeys, function (listsKey) {
      $storageServices.get(listsKey + 'Finish', function (result) {
        if (result !== 'true') {
          $scope.improves.push($scope.aiTodoLists[listsKey]);
        } else if(result === 'true') {
          $scope.goodSkills.push(listsKey);
        }
      })
    });

    var serverSkill = 0;
    var frontSkill = 0;
    var devOpsSkill = 0;
    var codingSkill = 0;

    if($scope.goodSkills.indexOf('front') !== -1) {
       frontSkill = 5;
    }

    if($scope.goodSkills.indexOf('mvc') !== -1) {
       serverSkill = 5;
    }

    if($scope.goodSkills.indexOf('refactor') !== -1) {
       codingSkill = 5;
    }
    if($scope.goodSkills.indexOf('container') !== -1 && $scope.goodSkills.indexOf('ci') !== -1) {
      devOpsSkill = 5;
    }
    var skills = {
      server: serverSkill,
      front: frontSkill,
      devops: devOpsSkill,
      coding: codingSkill
    };

    $http.get('rules/rules.nools').then(function (response) {
      var flow;
      if(nools.getFlow("AI Flow") === undefined){
        flow = nools.compile(response.data, {
          name: 'AI Flow'
        });
      } else {
        flow = nools.getFlow("AI Flow");
      }

      var SkillCal = flow.getDefined("skillcal");

      $scope.finallyWords = "你是一个";

      var session = flow.getSession(new SkillCal(skills))
        .on("modify", function (fact) {
          $scope.finallyWords += fact.text;
        })
        .on("fire", function (ruleName) {
          //alert(ruleName);
          console.log(ruleName);
        });

      session.match(function (err) {
        if (err) {
          console.error(err.stack);
        } else {
          console.log("done");
        }
      });
    });
  });
