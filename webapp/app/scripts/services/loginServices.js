'use strict';

var loginModule = angular.module('loginModule', ['ngResource']);

/**
 * Login services
 **/
loginModule.factory('loginServices', [
    '$resource',
    'backend_server_ip',
    function($resource, backend_server_ip) {
        /* Resource definition */
        var loginResource = $resource('http://' + backend_server_ip + '/api/login', {}, {});
        return {
            /* Create user */
            login: function(user) {
                console.log( 'Pre authentication' );
                loginResource.save(user);
            }
        };
    }
]);