angular.module('starter.controllers')
  .controller('CommunityCtrl', function ($scope, Discussions) {
    Discussions.all().$promise.then(function (response) {
      $scope.topics = response.data;
      $scope.included = response.included;
    });
    $scope.doRefresh = function () {
      Discussions.all().$promise.then(function (response) {
        $scope.topics = response.data;
        $scope.included = response.included;
      }).finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      })
    }
  })

  .controller('TopicCtrl', function ($scope, $stateParams, $filter, discussion) {
    discussion.$promise.then(function (response) {
      $scope.topic = response.data;
      var postId = response.data.relationships.posts.data[0].id;
      $scope.post = $filter('filter')(response.included, {type: "posts", id: postId})[0];
      $scope.user = $filter('filter')(response.included, {type: "users"})[0];
    });
  });
