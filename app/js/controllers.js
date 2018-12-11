angular.module('app.controllers', [])
  .controller('homeController', ['$scope', '$location', homeController])
  .controller('dashboardController', ['$scope', 'api', '$location', dashboardController])
  .controller('loginController', ['$scope', 'api', '$location', loginController])
  .controller('signupController', ['$scope', 'api', '$location', signupController]);

  function loginController($scope, api, $location) {
    $scope.email = '';
    $scope.password = '';

    $scope.login = function() {
      api.loginUser({email: $scope.email, password: $scope.password})
        .success(function(data) {
          if (data.message) {
            alert(data.message)
            return ;
          }
          localStorage.setItem('token', data.token);
          $location.url('/dashboard');
        })
    }
  }

  function signupController($scope, api, $location) {
    $scope.email = '';
    $scope.password = '';
    $scope.confirm_password = '';

    $scope.signup = function() {
      if ($scope.password != $scope.confirm_password) {      
        alert('Passwords not confirmed!')
        return ;
      }
  
      api.signupUser({email: $scope.email, password: $scope.password})
        .success(function(data) {
          alert(data.message)
          $location.url('/login');          
        })
    }
  }

  function homeController($scope, $location) {
    $scope.login = function() {
      $location.url('/login');
    }

    $scope.signup = function() {
      $location.url('/signup');
    }
  }

  function dashboardController($scope, api, $location) {
    $scope.users = []
    $scope.search = '';
    $scope.list = [];
    $scope.slicer = [];

    api.getList()
      .success(function(data) {
        $scope.list = data;
      });

    api.getUsers()
      .success(function(data) {
        $scope.users = data;
      });

    $scope.more = function(index) {
      $scope.slicer[index] = true;
    }

    $scope.less = function(index) {
      $scope.slicer[index] = false;
    }

    $scope.logout = function() {
      localStorage.removeItem('token');
      $location.url('/');
    }
  }