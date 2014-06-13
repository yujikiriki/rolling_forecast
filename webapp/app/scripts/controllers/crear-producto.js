'use strict';

angular.module('frontendApp').controller('CrearProductoCtrl', [
	'$scope',
	'productServices',
	function($scope, productServices) {
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

		/* Servicios */
		$scope.crearProducto = function(isValid) {
			if (isValid) {
				$scope.product.businessLine = $scope.product.businessLine.name;
				productServices.create($scope.product);
				$scope.feedbackMessages.push({
					type: 'success',
					text: 'El producto [' + $scope.product.name + '] ha sido creado correctamente.'
				});
				$scope.account = null;
			} 
			else
				$scope.feedbackMessages.push({
					type: 'warning',
					text: 'Falta diligenciar algunos campos del formulario.'
				});
		};
	}
]);