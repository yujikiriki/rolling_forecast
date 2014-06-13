'use strict';

angular.module('frontendApp').controller('MaestroProductosCtrl', [
	'$scope',
	'productServices',
	function ($scope, productServices) {
		/* Atributos */
		$scope.products = [];

		/* Constructor */
		queryAll();

		/* Servicios */
		$scope.eliminarProducto = function(oid, indice) {
			productServices.delete(oid);
			$scope.products.splice(indice, 1);
		};

		/* Metodos privados */
		function queryAll() {
			var products = productServices.queryAll();
			products.then(function(productList) {				
				$scope.products = productList;
			});
		};		
	}
]);
