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
        when('/contacts/add-user', {
          controller: AddCtrl,
          templateUrl: 'app/views/contacts/add-new.html'
        }).
        when('/contacts/edit/:id', {
          templateUrl: 'app/views/contacts/edit.html',
          controller: EditCtrl
        }).
        otherwise({redirectTo: '/'});
  });



  function AddCtrl($scope, $http, $location) {
    $scope.master = {};
    $scope.activePath = null;

    $scope.add_new = function(user, AddNewForm) {

      $http.post('api/add_user', user).success(function(){
        $scope.reset();
        $scope.activePath = $location.path('/contacts/');
      });

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();

    };
  }

  function EditCtrl($scope, $http, $location, $routeParams) {
    var id = $routeParams.id;
    $scope.activePath = null;

    $http.get('api/users/'+id).success(function(data) {
      $scope.users = data;
    });

    $scope.update = function(user){
      $http.put('api/users/'+id, user).success(function(data) {
        $scope.users = data;
        $scope.activePath = $location.path('/contacts/');
      });
    };

    $scope.delete = function(user) {
      console.log(user);

      var deleteUser = confirm('Are you absolutely sure you want to delete?');
      if (deleteUser) {
        $http.delete('api/users/'+user.id);
        $scope.activePath = $location.path('/contacts/');
      }
    };
  }
}());