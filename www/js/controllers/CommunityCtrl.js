angular.module('starter.controllers')
  .controller('CommunityCtrl', function ($scope, Discussions, TokenHandler, $http, $state, $ionicPopup, $rootScope, $ionicModal) {
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

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    $scope.doLogin = function(user) {
      var payload = {
        identification: user.username,
        password: user.password
      };

      $http.post('http://forum.growth.ren/' + 'api/token', payload)
        .success(function(data) {
          $scope.isLogin = true;
          $rootScope.userId = data.userId;
          TokenHandler.set(data.token);

          $scope.closeLogin();
        })
        .error(function(data, status) {
          console.log(data);
        });
    };
  })

  .controller('TopicCtrl', function ($scope, $stateParams, $filter, discussion) {
    discussion.$promise.then(function (response) {
      var postId = response.data.relationships.posts.data[0].id;
      $scope.topic = response.data;
      $scope.discussions = response.included;

      $scope.post = $filter('filter')(response.included, {type: "posts", id: postId})[0];
      $scope.user = $filter('filter')(response.included, {type: "users"})[0];

      $scope.discussion = response;
      $scope.getUsername = function(user) {
        var included = $scope.discussion.included;
        for(var i=0; i < included.length; ++i) {
          if(included[i].type === 'users' && included[i].id === user.data.id) {
            return included[i].attributes.username;
          }
        }
        return 'A user';
      ;}

      $scope.getAvatar = function(user) {
        var included = $scope.discussion.included;
        for(var i=0; i < included.length; ++i) {
          if(included[i].type === 'users' && included[i].id === user.data.id && included[i].attributes.avatarUrl) {
            return included[i].attributes.avatarUrl;
          }
        }
      };

      $scope.getUrl = function() {
        var txtSrc = discussion.data.id + ' ' + discussion.data.attributes.title;
        var output = txtSrc.replace(/[^a-zA-Z0-9]/g,' ').replace(/\s+/g,"-").toLowerCase();
        /* remove first dash */
        if(output.charAt(0) == '-') output = output.substring(1);
        /* remove last dash */
        var last = output.length-1;
        if(output.charAt(last) == '-') output = output.substring(0, last);

        return CONFIG.URL + 'd/' + output;
      }
    });
  });
