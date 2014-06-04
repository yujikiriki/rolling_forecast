'use strict';

angular.module('frontendApp').controller('CrearCuentaController', [
    '$scope',
    'accountServices',
    function($scope, accountServices) {
        /* Departamentos y municipios */
        $scope.departaments = [{
            'name': 'Antioquia',
            'cities': ['Medellin', 'Rionegro']
        }, {
            'name': 'Cundinamarca',
            'cities': ['Bogota', 'Chia']
        }, {
            'name': 'Amazonas',
            'cities': ['Leticia']
        }];

        /* Servicios */
        $scope.crearCuenta = function(isValid) {
            if ( isValid ) {
                // accountServices.create( $scope.account );
            	var accounts = accountServices.queryAll();
            	accounts.then( function( accountList ) {
            		console.log('Account list: ',accountList);
            	});
            }
            else
                console.log('Not yet');
        };
    }
]);