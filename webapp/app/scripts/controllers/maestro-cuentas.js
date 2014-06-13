'use strict';

angular.module('frontendApp').controller('MaestroCuentasCtrl', [
	'$scope',
	'accountServices',
	function($scope, accountServices) {
		/* Atributos */
		$scope.accounts = [];

		/* Constructor */
		queryAll();

		/* Servicios */
		$scope.eliminarCuenta = function(oid, indice) {
			accountServices.delete(oid);
			$scope.accounts.splice(indice, 1);
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