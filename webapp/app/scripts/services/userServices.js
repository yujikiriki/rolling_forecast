'use strict';

var userModule = angular.module('userModule', ['ngResource']);

/**
 * Account services
 **/
userModule.factory('userServices', [
    '$resource',
    'backend_server_ip',
    function($resource, backend_server_ip) {

        /* Resource definition */
        var userResource = $resource(
            'http://' + backend_server_ip + '/api/users/:id', {
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

        var responsibleResource = $resource(
            'http://' + backend_server_ip + '/api/responsibles?role=:role', {
                role: 'userRole'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }
        );

        return {

            /* GET user */
            get: function(userId) {
                var user = userResource.get({id: userId});
                return user.$promise;
            },

            /* GET all 'responsible' users available */
            queryResponsibles: function(userRole) {
                var all = responsibleResource.query({role: userRole});
                return all.$promise;
            },

            /* GET all users available */
            queryAll: function() {
                var all = userResource.query();
                return all.$promise;
            },

            /* Create user */
            create: function(user) {
                userResource.save(user);
            },

            /* Delete user */
            delete: function(userId) {
                userResource.delete({id: userId});
            }
        };
    }
]);