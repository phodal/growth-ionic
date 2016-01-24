angular.module('starter.services')
  .factory('Topics', function($resource) {
    var api = 'http://forum.growth.ren/api';
    var topics = [];
    var resource =  $resource(api + '/discussions');
    var getTopics = function(tab, page, callback) {
      return resource.get({}, function(r) {
        return callback && callback(r);
      });
    };
    return {
      refresh: function() {
        return getTopics({}, 1, function(response) {
          console.log(response);
          topics = response.data;
        });
      }
    };
  });
