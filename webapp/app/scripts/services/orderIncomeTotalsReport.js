'use strict';

var reportModule = angular.module('reportModule');

/**
 * Report services
 **/
reportModule.factory('orderIncomeTotalsReportServices', [
    '$resource',
    'backend_server_ip',
    function($resource, backend_server_ip) {
        /* Resource definition */
        var reportPerYearResource = $resource(
            'http://' + backend_server_ip + '/api/order_income_report//', {}, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }
        );
        return {
            /* GET report per year */
            query: function(nYear) {
                var report = reportPerYearResource.query();
                return report.$promise;
            },
        };
    }
]);
