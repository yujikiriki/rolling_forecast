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
            'http://localhost:9100/accounts/:Id', 
            {Id: '@Id'}, 
            {
            	'update': { method: 'PUT' },
            	'query': { method: 'GET', isArray: true}
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
                console.log('Account to be created: ', account);
                return 'Create';
            }
        };
    }
]);