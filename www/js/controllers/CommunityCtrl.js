angular.module('starter.controllers')
  .controller('CommunityCtrl', function ($scope, Topics) {
    Topics.refresh().$promise.then(function (response) {
      $scope.topics = response.data;
      $scope.included = response.included;
    });
    $scope.doRefresh = function () {
      Topics.refresh().$promise.then(function (response) {
        $scope.topics = response.data;
        $scope.included = response.included;
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
      })
    }
  })

  .controller('TopicCtrl', function ($scope, Topics, $stateParams) {
    var id = parseInt($stateParams.id);
    $scope.post = Topics.getPostById(id);
    $scope.topic = Topics.getTopicById(id);
  });
