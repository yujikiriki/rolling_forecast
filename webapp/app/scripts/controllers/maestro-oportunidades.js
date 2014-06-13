'use strict';

angular.module('frontendApp').controller('MaestroOportunidadesCtrl', [
	'$scope',
	'opportunityServices',		
	function ($scope, opportunityServices) {
		/* Atributos */
		$scope.opportunities = [];

		/* Constructor */
		queryAll();

		/* Servicios */
		$scope.eliminarOportunidad = function(oid, indice) {
			opportunityServices.delete(oid);
			$scope.opportunities.splice(indice, 1);
		};

		/* Metodos privados */
		function queryAll() {
			var opportunities = opportunityServices.queryAll();
			opportunities.then(function(opportunityList) {				
				$scope.opportunities = opportunityList;
			});
		};		
	}
]);		
