'use strict';

var accountModule = angular.module('accountModule', ['ngResource']);

/**
 * Account services
 **/
accountModule.factory('accountServices', [
    '$resource',
    'backend_server_ip',
    function($resource, backend_server_ip) {

        /* Resource definition */
        var accountResource = $resource(
            'http://' + backend_server_ip + '/api/accounts/:id', {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'query': {
                    method: 'GET',
                    isArray: true
                },
                'delete': {
                    method: 'DELETE',
                    params: {}
                }
            }
        );

        return {

            /* GET an Account */
            get: function(accountId) {
                var account = accountResource.get({id: accountId});
                return account.$promise;
            },

            /* GET all Accounts available */
            queryAll: function() {
                var all = accountResource.query();
                return all.$promise;
            },

            /* Create an Account */
            create: function(account) {
                accountResource.save(account);
            },

            /* Delete an Account */
            delete: function(accountId) {
                accountResource.delete({id: accountId});
            },

            /* Update an Account */
            update: function(account) {
                accountResource.update(account); 
            }    
        };
    }
]);