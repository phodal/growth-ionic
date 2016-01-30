angular.module('starter.controllers')
  .controller('CreateCtrl', function ($scope, $http, $state, $window) {
    $scope.post = {
      title: '',
      content: ''
    };

    $scope.isInCreating = false;
    $scope.create = function (){
      $scope.isInCreating = true;
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
        $scope.isInCreating = false;
        $state.go('app.topic', {id: response.data.id});
      }).error(function(data, status){
        $scope.isInCreating = false;
        if(status === 401){
          $scope.modal.show();
        }
      })
    }
  });
