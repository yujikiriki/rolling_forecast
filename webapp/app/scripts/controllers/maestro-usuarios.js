'use strict';

angular.module('frontendApp').controller('MaestroUsuariosCtrl', [
	'$scope',
	'$location',
	'userServices',
	function($scope, $location, userServices) {
		/* Atributos */
		$scope.users = [];

		/* Constructor */
		queryAll();

		/* Servicios */
		$scope.eliminarUsuario = function(oid, indice) {
			userServices.delete(oid);
			$scope.users.splice(indice, 1);
		};

		$scope.actualizarUsuario = function(oid, indice) {
			$location.path( 'usuarios/' + oid );		
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