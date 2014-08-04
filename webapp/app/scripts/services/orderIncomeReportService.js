'use strict';

var reportModule = angular.module('reportModule', ['ngResource']);

/**
 * Report services
 **/
reportModule.factory('orderIncomeReportServices', [
    '$resource',
    function($resource) {
        /* Resource definition */
        var reportResource = $resource(
            'http://localhost/api/order_income_report/:year', {
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
    function($resource) {
        /* Resource definition */
        var reportResource = $resource(
            'http://localhost/api/sales_report/:year', {
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
