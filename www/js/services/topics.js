angular.module('starter.services')
  .factory('Topics', function ($resource, $filter) {
    var api = 'http://forum.growth.ren/api';
    var topics = [];
    var res = {};
    var resource = $resource(api + '/discussions');
    var topicResource = $resource(api + '/posts/:id');
    var getTopics = function (tab, page, callback) {
      return resource.get({}, function (r) {
        return callback && callback(r);
      });
    };
    return {
      getTopicById: function (id) {
        return topicResource.get({id: id}, function (response) {
          return response;
        });
      },
      refresh: function () {
        return getTopics({}, 1, function (response) {
          res = response;
          topics = response.data;
        });
      }
    };
  })
  .factory('Discussions', function ($resource, CONFIG, TokenHandler) {
    var resource = $resource('http://forum.growth.ren/' + 'api/discussions/:id', {id: '@id'}, {
      update: {method: 'PUT'},
      all: {method: 'GET'}
    });

    resource = TokenHandler.wrapActions(resource, ['query', 'update', 'save', 'get', 'remove', 'delete', 'all']);
    return resource;
  });
