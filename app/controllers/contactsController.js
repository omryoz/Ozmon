(function() {
    
    var ContactsController = function ($scope, $log, $window, contactsFactory) {
        $scope.sortBy = 'name';
        $scope.reverse = false;
        $scope.master = {};
        $scope.activePath = null;
        $scope.contacts = [];

        
        function init() {
            contactsFactory.getContacts()
                .success(function(contacts) {
                    $scope.contacts = contacts;
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });


        }
        
        init();
        $scope.add_new = function(user, AddNewForm) {
            contactsFactory.addContact(user)

                .success(function(){
                    $scope.reset();
                    $scope.activePath = $location.path('/contacts/');
                });

            $scope.reset = function() {
                $scope.user = angular.copy($scope.master);
            };
            $scope.reset();
        };

        $scope.doSort = function(propName) {
           $scope.sortBy = propName;
           $scope.reverse = !$scope.reverse;
        };

        $scope.deleteContact = function(contactId) {
            contactsFactory.deleteContact(contactId)
                .success(function(status) {
                    if (status) {
                        for (var i=0,len=$scope.contacts.length;i<len;i++) {
                            if ($scope.contacts[i].id === contactId) {
                               $scope.contacts.splice(i,1);
                               break;
                            }
                        }  
                    }
                    else {
                        $window.alert('Unable to delete contact');   
                    }
                    
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
        };
    };
    
    ContactsController.$inject = ['$scope', '$log', '$window', 'contactsFactory'];

    angular.module('OzMonApp')
      .controller('ContactsController', ContactsController);
    
}());/**
 * Created by Omry on 20/12/2014.
 */
