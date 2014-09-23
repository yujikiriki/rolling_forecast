'use strict';

angular.module('frontendApp').controller('ActualizarProductoCtrl', [
	'$scope',
	'$routeParams',
	'productServices',
	function($scope, $routeParams, productServices) {
		/* Feedback messages */
		$scope.feedbackMessages = [];

		/* queryAll() result */
		$scope.products = [];

		/* Business lines */
		$scope.businessLines = [{
			'name': 'MESY'
		}, {
			'name': 'MCC'
		}, {
			'name': 'MCC'
		}, {
			'name': 'MCV'
		}, {
			'name': 'MSW'
		}, {
			'name': 'MEC'
		}, {
			'name': 'G'
		}];

		/* Constructor */
		{
			$scope.idProducto = $routeParams.idProducto;
			cargarProducto();
		}


		/* Servicios */
		$scope.actualizarProducto = function(isValid) {
			if (isValid) {
				$scope.product.businessLine = $scope.product.businessLine.name;
				productServices.update($scope.idProducto, $scope.product);
				$scope.feedbackMessages.push({
					type: 'success',
					text: 'El producto [' + $scope.product.name + '] ha sido actualizado correctamente.'
				});
				$scope.product = null;
			} 
			else
				$scope.feedbackMessages.push({
					type: 'warning',
					text: 'Falta diligenciar algunos campos del formulario.'
				});
		};

		/* Private */
		function cargarProducto() {		
			var producto = productServices.get($scope.idProducto);
			producto.then(function(result){
				$scope.product = {
					businessLine: result.businessLine,
					name: result.name,
					description: result.description
				};
			});
		}
	}
]);
