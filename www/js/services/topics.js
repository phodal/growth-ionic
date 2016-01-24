angular.module('starter.services')
  .factory('Topics', function($resource, $filter) {
    var api = 'http://forum.growth.ren/api';
    var topics = [];
    var res = {};
    var resource =  $resource(api + '/discussions');
    var getTopics = function(tab, page, callback) {
      return resource.get({}, function(r) {
        return callback && callback(r);
      });
    };
    return {
      getTopicById: function(id) {
        return $filter('filter')(res.included, {type: "posts", id: id})[0];
      },
      refresh: function() {
        return getTopics({}, 1, function(response) {
          res = response;
          topics = response.data;
        });
      }
    };
  });
