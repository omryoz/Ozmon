(function() {
  var app = angular.module('OzMonApp', ['ngRoute']);
  app.config(function($routeProvider) {
    $routeProvider.
        when('/', {
          templateUrl: 'app/views/home.html',
          controller: 'ContactsController'
        }).
        when('/contacts/', {
          controller: 'ContactsController',
          templateUrl: 'app/views/contacts/lists.html'
        }).
        when('/contacts/add-contact', {
          controller: 'ContactsController',
          templateUrl: 'app/views/contacts/add-new.html'
        }).
        when('/contacts/edit/:id', {
          templateUrl: 'app/views/contacts/edit.html',
          controller: 'ContactsController'
        }).
        otherwise({redirectTo: '/'});
  });

}());