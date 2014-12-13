// Declare app level module which depends on filters, and services
angular.module('Ozmon', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/home/home.html',
        controller: 'HomeController'})
        .when('/customers', {
          controller: 'CustomersController',
          templateUrl: 'app/views/customers.html'
        })
        .when('/orders/:customerId', {
          controller: 'OrdersController',
          templateUrl: 'app/views/orders.html'
        })
      .otherwise({redirectTo: '/'});
  }]);



