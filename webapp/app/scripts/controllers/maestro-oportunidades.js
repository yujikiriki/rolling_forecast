'use strict';

angular.module('frontendApp').controller('MaestroOportunidadesCtrl', [
	'$scope',
	'_',
	'$q',	
	'opportunityServices',
	'accountServices',
	'productServices',
	'userServices',	
	function($scope, _, $q, opportunityServices, accountServices, productServices, userServices) {
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
				/* Translate ResponsibleName */
				.then( function() {
					_.map($scope.opportunities, function(opportunity) {
						var pResponsible = userServices.get(opportunity.userId);
						pResponsible.then(function( responsible ) {
							opportunity.responsibleName = responsible.name;
						});
					});					
				})				
				/* Translate AccountName */
				.then(function() {
					_.map($scope.opportunities, function(opportunity) {
						var pAccount = accountServices.get(opportunity.accountId);
						pAccount.then(function( account ) {
							opportunity.accountName = account.name;
						});
					});
				})
				/* Translate ProductName */
				.then( function() {
					_.map($scope.opportunities, function(opportunity) {
						var pProduct = productServices.get(opportunity.productId);
						pProduct.then(function( product ) {							
							opportunity.productName = product.name;							
							opportunity.businessLine = product.businessLine;
						});
					});					
				})
				/* Clean dates */
				.then( function() {
					_.map($scope.opportunities, function(opportunity) {
							opportunity.order.date = opportunity.order.date.substring(0,10);
							opportunity.sale.date = opportunity.sale.date.substring(0,10);
							opportunity.order.probability = opportunity.order.probability + '%';
							opportunity.sale.probability = opportunity.sale.probability + '%';
						});
					});									
		}
}]);