'use strict';

var reportModule = angular.module('reportModule', ['ngResource']);

/**
 * Report services
 **/
reportModule.factory('orderIncomeReportServices', [
    '$resource',
    'backend_server_ip',
    function($resource, backend_server_ip) {
        /* Resource definition */
        var reportResource = $resource(
            'http://' + backend_server_ip + '/api/order_income_report/:year', {
                year: '@year'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }
        );
        return {
            /* GET a Product */
            query: function( nYear ) {
                var report = reportResource.query({year: nYear});
                return report.$promise;
            }
        };
    }
]);

reportModule.factory('salesReportServices', [
    '$resource',
    'backend_server_ip',
    function($resource, backend_server_ip) {
        /* Resource definition */
        var reportResource = $resource(
            'http://' + backend_server_ip + '/api/sales_report/:year', {
                year: '@year'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }
        );
        return {
            /* GET a Product */
            query: function( nYear ) {
                var report = reportResource.query({year: nYear});
                return report.$promise;
            }
        };
    }
]);
