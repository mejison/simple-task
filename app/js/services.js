angular.module('app.services', [])
  .factory('api', function($http) {

    var api = {};
    var API_URL = "http://simple.da/api/v1/";

    api.getUsers = function() {
      return $http({
        method: 'GET',
        url: API_URL + 'user'
      });
    }

    api.getList = function() {
      return $http({
        method: 'GET',
        url: 'https://api.github.com/repos/angular/angular/commits'
      })
    }

    api.signupUser = function(data) {
      return $http({
        method: 'POST',
        url: API_URL + 'user',
        data: data
      })
    }

    api.loginUser = function(data) {
      return $http({
        method: 'POST',
        url: API_URL + 'user/auth',
        data: data
      })
    }

    return api;
  });