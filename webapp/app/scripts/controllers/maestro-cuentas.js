'use strict';

angular.module('frontendApp').controller('MaestroCuentasCtrl', [
	'$scope',
	'$location',
	'accountServices',
	function($scope, $location, accountServices) {
		/* Atributos */
		$scope.accounts = [];

		/* Constructor */
		queryAll();

		/* Servicios */
		$scope.eliminarCuenta = function(oid, indice) {
			accountServices.delete(oid);
			$scope.accounts.splice(indice, 1);
		};

		$scope.actualizarCuenta = function(oid) {
			$location.path( 'cuentas/' + oid );
		};

		/* Metodos privados */
		function queryAll() {
			var accounts = accountServices.queryAll();
			accounts.then(function(accountList) {
				$scope.accounts = accountList;
			});
		};
	}
]);
