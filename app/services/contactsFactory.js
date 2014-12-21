/**
 * Created by Omry on 20/12/2014.
 */
(function() {
    var contactsFactory = function($http, $location) {

        var factory = {};

        factory.getContacts = function() {

            return $http.get('api/users');
        };

        factory.getContact = function(contactId) {
            return $http.get('/contacts/' + contactId);
        };
        factory.addContact = function(user) {
            $http.post('api/add_user', user)
        }


        factory.deleteContact = function(contactId) {
            return $http.delete('/contacts/' + contactId);
        }

        return factory;
    };

    contactsFactory.$inject = ['$http'];

    angular.module('OzMonApp').factory('contactsFactory',
        contactsFactory);

}());