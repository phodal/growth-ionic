angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope, $http, $rootScope, $storageServices, $ionicHistory) {
    // Form data for the login modal
    $scope.user = {};
    $scope.isLogin = $rootScope.userId;

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
          if(status === 401){
            $scope.error = '用户名或密码错误'
          }
        });
    };
  });
