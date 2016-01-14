angular.module('app.AIControl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('AIControl', function ($scope, $ionicModal, $storageServices, $analytics, $http) {
    $analytics.trackView('AI Controller');

    $http.get('/rules/test.nools').then(function (response) {
      var logger = function (res) {
        console.log(res);
      };
      var flow = nools.compile(response.data, {
        scope: {
          logger: logger
        },
        name: 'AI Flow'
      });
      var session = flow.getSession().on("fire", function (ruleName) {
        //console.log(ruleName);
      });
      var SkillCal = flow.getDefined("skillcal");

      session.assert(new SkillCal("server", 5));
      session.match(function (err) {
        if (err) {
          console.error(err.stack);
        } else {
          console.log("done");
        }
      });
      var finallyWords = "";
      var firstWord = "你是一个";

      finallyWords = finallyWords + firstWord;
      angular.forEach(session.getFacts(), function(fact){
        finallyWords = finallyWords + fact.text;
      });

      $scope.finallyWords = finallyWords;
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
