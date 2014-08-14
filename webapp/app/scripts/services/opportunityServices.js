'use strict';

var opportunityModule = angular.module('opportunityModule', ['ngResource']);

/**
 * Account services
 **/
opportunityModule.factory('opportunityServices', [
    '$resource',
    'backend_server_ip',
    function($resource, backend_server_ip) {

        /* Resource definition */
        var opportunityResource = $resource(
            'http://' + backend_server_ip + '/api/opportunities/:id', {
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
