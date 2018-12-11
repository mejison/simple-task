angular.module('app', [
  'app.services',  
  'app.controllers',  
  'ngRoute',
  'ngRoute.middleware'
])
.config(['$routeProvider', '$locationProvider', '$middlewareProvider', function($routeProvider, $locationProvider, $middlewareProvider) {
  
  $middlewareProvider.map({    
    'pass': [function middlewareOne() {
      return this.next();
    }],
    'auth': [function middlewareOne() {
      var token = localStorage.getItem('token');
      if(token) {
        return this.next();
      }
      this.redirectTo('/');
    }]  
  });

  $routeProvider
    .when("/dashboard", {
      templateUrl: "partials/dashboard.html",
      controller: "dashboardController",
      middleware: 'auth'
    })
    .when("/login", {
      templateUrl: "partials/login.html",
      controller: "loginController",
      middleware: 'pass'
    })
    .when("/signup", {
      templateUrl: "partials/signup.html",
      controller: "signupController",
      middleware: 'pass'
    })
    .when("/", {
      templateUrl: "partials/home.html",
      controller: "homeController",
      middleware: 'pass'
    })
    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);  
}]);