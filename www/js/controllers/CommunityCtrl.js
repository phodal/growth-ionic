angular.module('starter.controllers')
  .controller('CommunityCtrl', function ($scope, Discussions, TokenHandler, $http, $state, $ionicPopup, $rootScope, $ionicModal, $storageServices, $ionicTabsDelegate) {

    $scope.goForward = function () {
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1) {
        $ionicTabsDelegate.select(selected + 1);
      }
    };

    $scope.goBack = function () {
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1 && selected != 0) {
        $ionicTabsDelegate.select(selected - 1);
      }
    };

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
    };

    // Form data for the login modal
    $scope.user = {};
    $scope.isLogin = false;
    if($rootScope.userId){
      $scope.isLogin = true;
    }

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    $scope.doLogin = function (user) {
      var payload = {
        identification: user.username,
        password: user.password
      };

      $http.post('http://forum.growth.ren/' + 'api/token', payload)
        .success(function (data) {
          $scope.isLogin = true;
          $rootScope.userId = data.userId;
          TokenHandler.set(data.token);
          $storageServices.set('token', data.token);
          $scope.closeLogin();
        })
        .error(function (data, status) {
          console.log(data);
        });
    };
  })

  .controller('TopicCtrl', function ($scope, $stateParams, $filter, discussion, $rootScope, $ionicModal, $http, TokenHandler, $storageServices, $window, $cordovaToast) {
    $scope.isLogin = false;
    if($rootScope.userId){
      $scope.isLogin = true;
    }

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    $scope.doLogin = function (user) {
      var payload = {
        identification: user.username,
        password: user.password
      };

      $http.post('http://forum.growth.ren/' + 'api/token', payload)
        .success(function (data) {
          $scope.isLogin = true;
          $rootScope.userId = data.userId;
          TokenHandler.set(data.token);
          $storageServices.set('token', data.token);
          $scope.closeLogin();
        })
        .error(function (data, status) {
          console.log(data);
        });
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
  })
  .controller('CreateCtrl', function ($scope, $http, $state, $window) {
    $scope.post = {};

    $scope.create = function (){
      var data = {
        "data": {
          "attributes": {
            "content": $scope.post.content,
            "title": $scope.post.title
          },
          "relationships": {"tags": {"data": [{"id": "3", "type": "tags"}, {"id": "1", "type": "tags"}]}},
          "type": "discussions"
        }
      };
      $http({
        method: 'POST',
        url: 'http://forum.growth.ren/api/discussions',
        data: data,
        headers: {
          'Authorization': 'Token ' + $window.localStorage.getItem('token')
        }
      }).success(function (response) {
        //var id = response.data.id;
        //$state.go('#/app/topic/:' + id)
      }).error(function(data, status){
        if(status === 401){
          $scope.modal.show();
        }
      })
    }
  });
