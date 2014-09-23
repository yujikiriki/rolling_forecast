'use strict';

angular.module('frontendApp').controller('MaestroProductosCtrl', [
	'$scope',
	'$location',
	'productServices',
	function ($scope, $location, productServices) {
		/* Atributos */
		$scope.products = [];

		/* Constructor */
		queryAll();

		/* Servicios */
		$scope.eliminarProducto = function(oid, indice) {
			productServices.delete(oid);
			$scope.products.splice(indice, 1);
		};

		$scope.actualizarProducto = function(oid) {
			$location.path( 'productos/' + oid );
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
