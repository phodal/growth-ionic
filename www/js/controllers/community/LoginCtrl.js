angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope, $http, $rootScope, $storageServices, $ionicHistory, $ionicPopup, $auth) {
    // Form data for the login modal
    $scope.user = {};
    $scope.isLogin = $rootScope.userId;

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have successfully logged in!'
          })
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          })
        });
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
          $storageServices.set('token', data.token);
          $ionicHistory.goBack(-1);
        })
        .error(function (data, status) {
          if (status === 401) {
            $scope.error = '用户名或密码错误'
          }
        });
    };
  });
