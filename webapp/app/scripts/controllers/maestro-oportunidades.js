'use strict';

angular.module('frontendApp').controller('MaestroOportunidadesCtrl', [
	'$scope',
	'_',
	'$q',
	'opportunityServices',
	'accountServices',
	'productServices',
	function($scope, _, $q, opportunityServices, accountServices, productServices) {
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
			opportunityServices.queryAll()
				/* Load all Opportunities */
				.then(function(opportunityList) {
					$scope.opportunities = opportunityList;				
				})
				/* Translate AccountName */
				.then(function() {
					_.map($scope.opportunities, function(opportunity){
						var pAccount = accountServices.get(opportunity.accountId);
						pAccount.then(function( account ) {
							opportunity.accountName = account.name;
						});
					});
				})
				/* Translate ProductName */
				.then( function() {
					_.map($scope.opportunities, function(opportunity){
						var pProduct = productServices.get(opportunity.productId);
						pProduct.then(function( product ) {
							opportunity.productName = product.name;
						});
					});					
				});			
		}
}]);