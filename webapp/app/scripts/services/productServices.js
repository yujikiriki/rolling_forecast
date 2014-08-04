'use strict';

var productModule = angular.module('productModule', ['ngResource']);

/**
 * product services
 **/
productModule.factory('productServices', [
    '$resource',
    function($resource) {

        /* Resource definition */
        var productResource = $resource(
            'http://localhost/api/products/:id', {
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
            /* GET a Product */
            get: function(productId) {
                var product = productResource.get({id: productId});
                return product.$promise;
            },

            /* GET all products available */
            queryAll: function() {
                var all = productResource.query();
                return all.$promise;
            },

            /* Create an product */
            create: function(product) {
                productResource.save(product);
            },

            /* Delete an product */
            delete: function(productId) {
                productResource.delete( { id : productId } );
            }
        };
    }
]);