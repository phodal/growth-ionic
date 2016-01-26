angular.module('starter.services')
  .factory('TokenHandler', function ($http) {
    var tokenHandler = {};
    var token = "none";

    tokenHandler.set = function (newToken) {
      token = newToken;
      $http.defaults.headers.common.Authorization = 'Token ' + token;
      $http.defaults.headers.get = {'Authorization': 'Token ' + token};
    };

    tokenHandler.get = function () {
      return token;
    };

    // wrap given actions of a resource to send auth token with every
    // request
    tokenHandler.wrapActions = function (resource, actions) {
      // copy original resource
      var wrappedResource = resource;
      for (var i = 0; i < actions.length; i++) {
        tokenWrapper(wrappedResource, actions[i]);

      };
      // return modified copy of resource
      return wrappedResource;
    };

    // wraps resource action to send request with auth token
    var tokenWrapper = function (resource, action) {
      // copy original action
      resource[action]['headers'] = {'Authorization': 'Token ' + tokenHandler.get()};
      resource['_' + action] = resource[action];
      // create new action wrapping the original and sending token
      resource[action] = function (data, success, error) {
        return resource['_' + action](
          angular.extend({}, data || {}, {access_token: tokenHandler.get()}),
          success,
          error
        );
      };
    };

    return tokenHandler;
  });
