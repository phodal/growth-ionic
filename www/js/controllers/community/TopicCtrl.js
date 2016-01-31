angular.module('starter.controllers')
  .controller('TopicCtrl', function ($scope, $stateParams, $filter, discussion, $rootScope, $http, $storageServices, $window, $cordovaToast, $analytics, $ionicPopover) {
    $analytics.trackView('Community Topic Ctrl');

    $scope.$on('$ionicView.beforeEnter', function () {
      if ($rootScope.userId) {
        $scope.isLogin = true;
      }
    });

    $scope.isShowCommentBox = false;
    $scope.showCommentBox = function () {
      $scope.isShowCommentBox = true;
    };

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

    $scope.isLiked = function (relationships) {
      var isLike = false;
      var userId = relationships.user.data.id;
      angular.forEach(relationships.likes.data, function(like){
        if( userId === like.id) {
          isLike = true;
        }
      });
      return isLike;

    };

    $scope.encodeHTML = function (html) {
      return html.replace('href=', 'src=');
    };

    $scope.replyToUser = '';
    $scope.replyToId = '';

    $scope.replyTo = function (user, id) {
      $scope.isShowCommentBox = true;
      $scope.replyToUser = user;
      $scope.replyToId = id;
    };

    $scope.saveReply = function () {
      var content = $scope.replyContent;
      if ($scope.replyToUser !== '' && $scope.replyToUser !== '') {
        content = '@' + $scope.replyToUser + '#' + $scope.replyToId + $scope.replyContent;
      }

      var reply = {
        "data": {
          "type": "posts",
          "attributes": {"content": content},
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
        $scope.isShowCommentBox = false;
        $scope.replyContent = '';
        $scope.discussions.push(response.data);
        if (window.cordova) {
          $cordovaToast.showLongCenter('回复成功').then(function (success) {
            // success
          }, function (error) {
            // error
          });
        }
      }).error(function (data, status) {
        if (status === 401) {
          $scope.modal.show();
        }
      })
    };

    $scope.LikeIt = function (ID) {
      var like = {
        "data": {
          "type": "posts",
          "id": ID.toString(),
          "attributes": {
            "isLiked": true
          }
        }
      };

      $http({
        method: 'POST',
        url: 'http://forum.growth.ren/api/posts/' + ID,
        data: like,
        headers: {
          'X-Fake-Http-Method': 'PATCH',
          'Authorization': 'Token ' + $window.localStorage.getItem('token')
        }
      }).success(function (response) {

      }).error(function (data, status) {
        if (status === 401) {
          $scope.modal.show();
        }
      })
    };

    $ionicPopover.fromTemplateUrl('templates/community/more-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function ($event, id) {
      $scope.idInPopover = id;
      $scope.popover.show($event);
    };
    $scope.closePopover = function () {
      $scope.popover.hide();
    };
    $scope.$on('$destroy', function () {
      $scope.popover.remove();
    });

    $scope.deleteDiscuss = function () {
      var id = $scope.idInPopover;
      var deleteOpt = {"data": {"type": "posts", "id": id.toString(), "attributes": {"isHidden": true}}};

      $http({
        method: 'POST',
        url: 'http://forum.growth.ren/api/posts/' + id,
        data: deleteOpt,
        headers: {
          'X-Fake-Http-Method': 'PATCH',
          'Authorization': 'Token ' + $window.localStorage.getItem('token')
        }
      }).success(function (response) {
        $scope.popover.hide();
      }).error(function (data, status) {
        if (status === 401) {
          $scope.modal.show();
        }
      })
    };
  });
