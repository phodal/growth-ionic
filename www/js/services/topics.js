angular.module('starter.services')
  .factory('Topics', function ($resource, $filter) {
    var api = 'http://forum.growth.ren/api';
    var topics = [];
    var res = {};
    var resource = $resource(api + '/discussions');
    var topicResource = $resource(api + '/discussions/:id');
    var getTopics = function (tab, page, callback) {
      return resource.get({}, function (r) {
        return callback && callback(r);
      });
    };
    return {
      getTopicById: function (id) {
        return topicResource.get({id: id}, function(response) {
          return response.data;
        });
      },
      refresh: function () {
        return getTopics({}, 1, function (response) {
          res = response;
          topics = response.data;
        });
      }
    };
  });
