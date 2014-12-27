/**
 * Created by Omry on 20/12/2014.
 */
(function() {
    var contactsFactory = function($http, $location) {

        var factory = {};

        factory.getContacts = function() {

            return $http.get('api/contacts');
        };
        factory.getContactAttributes = function() {

            return $http.get('api/contacts/getAttributes')
        };

        factory.getContact = function(contactId) {
            return $http.get('api/contacts/' + contactId);
        };
        factory.addContact = function(contact) {
            //return $http.post('api/add_contact', contact)
            return $http({
                headers: { "Content-Type": "application/json"},
                method: 'POST',
                url: 'api/add_contact',
                data: contact
            });
        };
        factory.updateContact = function(id, contact) {
            //return $http.put('api/test/'+id, contact );
            return $http({
                            headers: { "Content-Type": "application/json"},
                            method: 'PUT',
                            url: 'api/contacts/'+id,
                            data: contact
                        });
        };

        factory.deleteContact = function(contactId) {
            $http.delete('api/contacts/'+contactId);
        };

        return factory;
    };

    contactsFactory.$inject = ['$http'];

    angular.module('OzMonApp').factory('contactsFactory',
        contactsFactory);

}());