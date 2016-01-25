angular.module('starter.services')
  .factory('Discussions', function ($resource) {
    var resource = $resource('http://forum.growth.ren/' + 'api/discussions/:id', {id: '@id'}, {
      update: {method: 'PUT'},
      all: {method: 'GET'}
    });

    return resource;
  })
  .factory('Users', function ($resource, TokenHandler) {
    var resource = $resource('http://forum.growth.ren/' + 'api/users/:id', {
      id: '@id'
    }, {
      update: {method: 'PUT'}
    });

    resource = TokenHandler.wrapActions(resource, ['query', 'update', 'save', 'get', 'remove', 'delete']);
    return resource;
  });
