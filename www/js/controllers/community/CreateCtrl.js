angular.module('starter.controllers')
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
