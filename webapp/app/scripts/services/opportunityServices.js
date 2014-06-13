'use strict';

var opportunityModule = angular.module('opportunityModule', ['ngResource']);

/**
 * Account services
 **/
opportunityModule.factory('opportunityServices', [
    '$resource',
    function($resource) {

        /* Resource definition */
        var opportunityResource = $resource(
            'http://localhost:9100/opportunities/:id', {
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

            /* GET all opportunities available */
            queryAll: function() {
                var all = opportunityResource.query();
                return all.$promise;
            },

            /* Create an Account */
            create: function(opportunity) {
                opportunityResource.save(opportunity);
            },

            /* Delete an opportunity */
            delete: function(opportunityId) {
                opportunityResource.delete( { id : opportunityId } );
            }
        };
    }
]);
