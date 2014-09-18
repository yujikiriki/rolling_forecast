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
        var reportPerYearResource = $resource(
            'http://' + backend_server_ip + '/api/order_income_report/:year', {
                year: '@year'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }
        );

        var reportPerBusinessLineResource = $resource(
            'http://' + backend_server_ip + '/api/order_income_report/:year/businessline/:businessline', {
                year: 'year',
                businessline: 'businessline'
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            });

        return {
            /* GET report per year */
            query: function(nYear) {
                var report = reportPerYearResource.query({
                    year: nYear
                });
                return report.$promise;
            },

            /* GET report per year per business line */
            queryBusinessLine: function(nYear, nBusinessLine) {
                var report = reportPerBusinessLineResource.query({
                    year: nYear,                
                    businessline: nBusinessLine
                });
                return report.$promise;
            }
        };
    }
]);
