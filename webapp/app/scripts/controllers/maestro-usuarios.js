'use strict';

angular.module('frontendApp').controller('MaestroUsuariosCtrl', [
	'$scope',
	'userServices',
	function($scope, userServices) {
		/* Atributos */
		$scope.users = [];

		/* Constructor */
		queryAll();

		/* Servicios */
		$scope.eliminarUsuario = function(oid, indice) {
			userServices.delete(oid);
			$scope.users.splice(indice, 1);
		};

		/* Metodos privados */
		function queryAll() {
			var users = userServices.queryAll();
			users.then(function(userList) {				
				$scope.users = userList;
			});
		};
	}
]);