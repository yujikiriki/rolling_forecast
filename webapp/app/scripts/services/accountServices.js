'use strict';

var accountModule = angular.module('accountModule', ['ngResource']);

/**
 * Account services
 **/
accountModule.factory('accountServices', [
    '$resource',
    function($resource) {

        /* Resource definition */
        var accountResource = $resource(
            'http://localhost:9100/accounts/:id', {
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
            delete: function(accountName) {
                console.log('The account to be deleted: ', accountName);
                accountResource.delete( { id : accountName } );
            }
        };
    }
]);