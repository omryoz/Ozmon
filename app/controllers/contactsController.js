(function() {
    
    var ContactsController = function ($scope, $location, $routeParams, $log, $window, contactsFactory) {
        $scope.sortBy = 'name';
        $scope.reverse = false;
        $scope.master = {};
        $scope.activePath = null;
        $scope.contacts = [];
        var contactid = (typeof $routeParams.id != 'undefined') ? $routeParams.id : null ;
        function init() {
            if (contactid == null) {
            contactsFactory.getContacts()
                .success(function(contacts) {
                    $scope.contacts = contacts;
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
            }
            else {
                contactsFactory.getContact(contactid)
                    .success(function(contacts) {
                        $scope.contacts.push(contacts);
                    })
                    .error(function(data, status, headers, config) {
                        $log.log(data.error + ' ' + status);
                    });
            }
        }
        init();
        $scope.add_new = function(user, AddNewForm) {
            contactsFactory.addContact(user)
                .success(function(){
                    $scope.reset();
                    $scope.activePath = $location.path('/contacts/');
                });

            $scope.reset();
        };

        $scope.doSort = function(propName) {
           $scope.sortBy = propName;
           $scope.reverse = !$scope.reverse;
        };
        $scope.deleteContact = function(user) {

                console.log(user);
              var deleteUser = confirm('Are you absolutely sure you want to delete?');
              if (deleteUser) {
                  contactsFactory.deleteContact(contactid);
                  $scope.activePath = $location.path('/contacts/');
              }
            };

        $scope.updateContact = function(user){
              contactsFactory.updateContact(contactid, user)
                  .success(function(data) {
                      confirm("we are inside");
                        $scope.users = data;
                        $scope.activePath = $location.path('/contacts/');
                  });
            };
        $scope.reset = function() {
            $scope.user = angular.copy($scope.master);
        };
        $scope.isUnchanged = function(user) {
            return angular.equals(user, $scope.master);
        };
    };
    
    ContactsController.$inject = ['$scope', '$location', '$routeParams', '$log', '$window', 'contactsFactory'];

    angular.module('OzMonApp')
      .controller('ContactsController', ContactsController);
    
}());/**
 * Created by Omry on 20/12/2014.
 */
