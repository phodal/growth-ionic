angular.module('app.AIControl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('AIControl', function ($scope, $ionicModal, $storageServices, $analytics, $http) {
    $analytics.trackView('AI Controller');

    $http.get('/rules/rules.nools').then(function (response) {
      var flow = nools.compile(response.data, {
        name: 'AI Flow'
      });
      var SkillCal = flow.getDefined("skillcal");

      var serverSkill = 5;
      var frontSkill = 5;
      var devOpsSkill = 4;
      var codingSkill = 4;

      $scope.finallyWords = "你是一个";
      var skills = {
        server: serverSkill,
        front: frontSkill,
        devops: devOpsSkill,
        coding: codingSkill
      };

      var session = flow.getSession(new SkillCal(skills))
        .on("modify", function (fact) {
          $scope.finallyWords += fact.text;
        })
        .on("fire", function (ruleName) {
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
    $scope.improves = [];
    $scope.aiTodoLists = TODO_LISTS;
    var todoMenuKeys = Object.keys(TODO_LISTS);

    angular.forEach(todoMenuKeys, function (listsKey) {
      $storageServices.get(listsKey + 'Finish', function (result) {
        if (result !== 'true') {
          $scope.improves.push($scope.aiTodoLists[listsKey]);
        }
      })
    });
  });
