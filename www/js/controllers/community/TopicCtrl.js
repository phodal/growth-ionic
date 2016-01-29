angular.module('starter.controllers')
  .controller('TopicCtrl', function ($scope, $stateParams, $filter, discussion, $rootScope, $ionicModal, $http, TokenHandler, $storageServices, $window, $cordovaToast) {
    if($rootScope.userId){
      $scope.isLogin = true;
    }

    discussion.$promise.then(function (response) {
      $scope.replyContent = '';
      var postId = response.data.relationships.posts.data[0].id;
      $scope.topic = response.data;
      $scope.discussionID = response.data.id;
      $scope.discussions = response.included;

      $scope.post = $filter('filter')(response.included, {type: "posts", id: postId})[0];
      $scope.user = $filter('filter')(response.included, {type: "users"})[0];

      $scope.discussion = response;
    });

    $scope.getUsername = function (user) {
      var included = $scope.discussion.included;
      for (var i = 0; i < included.length; ++i) {
        if (included[i].type === 'users' && included[i].id === user.data.id) {
          return included[i].attributes.username;
        }
      }
      return 'A user';
    };

    $scope.getAvatar = function (user) {
      var included = $scope.discussion.included;
      for (var i = 0; i < included.length; ++i) {
        if (included[i].type === 'users' && included[i].id === user.data.id && included[i].attributes.avatarUrl) {
          return included[i].attributes.avatarUrl;
        }
      }
    };

    $scope.encodeHTML = function (html) {
      return html.replace('href=', 'src=');
    };


    $scope.saveReply = function() {
      var reply = {
        "data": {
          "type": "posts",
          "attributes": {"content": $scope.replyContent},
          "relationships": {"discussion": {"data": {"type": "discussions", "id": $stateParams.id}}}
        }
      };

      $http({
        method: 'POST',
        url: 'http://forum.growth.ren/api/posts',
        data: reply,
        headers: {
          'Authorization': 'Token ' + $window.localStorage.getItem('token')
        }
      }).success(function (response) {
        $scope.replyContent = {};
        $cordovaToast.showLongBottom('Success').then(function(success) {
          // success
        }, function (error) {
          // error
        });
      }).error(function(data, status){
        if(status === 401){
          $scope.modal.show();
        }
      })
    };

    $scope.LikeIt = function(ID) {
      var like = {
        "data":
        {
          "type": "posts",
          "id": ID.toString(),
          "attributes":
          {
            "isLiked": true
          }
        }
      };

      $http({
        method: 'POST',
        url: 'http://forum.growth.ren/api/posts/' + ID,
        data: like,
        headers: {
          'Authorization': 'Token ' + $window.localStorage.getItem('token')
        }
      }).success(function (response) {

      }).error(function(data, status){
        if(status === 401){
          $scope.modal.show();
        }
      })
    };
  });
