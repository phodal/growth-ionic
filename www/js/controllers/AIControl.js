angular.module('app.AIControl', ['starter.factory', 'hljs', 'starter.utils'])
  .controller('AIControl', function ($scope, $ionicModal, $storageServices, $analytics, $http) {
    $analytics.trackView('AI Controller');

    $http.get('/rules/test.nools').then(function(response){
      var logger = function(res){
        console.log(res);
      };
      var flow = nools.compile(response.data, {
          scope: {
            logger: logger
          },
          name: 'AI Flow'
        });
      var session = flow.getSession();
      var Message = flow.getDefined("message");

      session.assert(new Message("goodbye"));
      session.assert(new Message("hello"));
      session.assert(new Message("hello world"));
      session.match(function(err){
        if(err){
          console.error(err.stack);
        }else{
          console.log("done");
        }
      })
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
