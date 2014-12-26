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
        $scope.add_new = function(contact, AddNewForm) {
            contactsFactory.addContact(contact)
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
        $scope.deleteContact = function(contact) {

                console.log(contact);
              var deleteContact = confirm('Are you absolutely sure you want to delete?');
              if (deleteContact) {
                  contactsFactory.deleteContact(contactid);
                  $scope.activePath = $location.path('/contacts/');
              }
            };

        $scope.updateContact = function(contact){
              contactsFactory.updateContact(contactid, contact)
                  .success(function(data) {
                        $scope.contacts = data;
                        $scope.activePath = $location.path('/contacts/');
                  });
            $scope.activePath = $location.path('/contacts/');
            };
        $scope.reset = function() {
            $scope.contact = angular.copy($scope.master);
        };
        $scope.isUnchanged = function(contact) {
            return angular.equals(contact, $scope.master);
        };
    };
    
    ContactsController.$inject = ['$scope', '$location', '$routeParams', '$log', '$window', 'contactsFactory'];

    angular.module('OzMonApp')
      .controller('ContactsController', ContactsController);
    
}());/**
 * Created by Omry on 20/12/2014.
 */
