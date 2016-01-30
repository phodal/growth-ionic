angular.module('starter.controllers')
  .controller('SigninCtrl', function ($scope, $http, $state, $ionicPopup, $translate, $analytics) {
    $analytics.trackView('Community Signin Ctrl');

    $scope.user = {
      username: '',
      password : '',
      email: ''
    };

    $scope.signIn = function() {
      var payload = {
        username: $scope.user.username,
        email: $scope.user.email,
        password: $scope.user.password
      };

      $http.post('http://forum.growth.ren/register', payload)
        .success(function (data) {
          var alertPopup = $ionicPopup.alert({
            title: '注册成功',
            template: '欢迎你，' + $scope.user.username + '。我们已经发送了一封邮件至 ' + $scope.user.email + '，请打开它并完成账号激活。'
          });

          alertPopup.then(function(res) {
            $state.go('app.community');
            console.log('Thank you for not eating my delicious ice cream cone');
          });
        })
        .error(function (data, status) {
          console.log(data.errors);
          $scope.errors = data.errors
        });

    };

  });
