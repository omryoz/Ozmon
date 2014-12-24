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
            return $http.get('api/users/' + contactId);
        };
        factory.addContact = function(user) {
            //return $http.post('api/add_user', user)
            return $http({
                method: 'POST',
                url: 'api/add_user',
                data: user
            });
        };
        factory.updateContact = function(id, user) {
            return $http.put('api/test/'+id, user );

        };

        factory.deleteContact = function(contactId) {
            $http.delete('api/users/'+contactId);
        };

        return factory;
    };

    contactsFactory.$inject = ['$http'];

    angular.module('OzMonApp').factory('contactsFactory',
        contactsFactory);

}());