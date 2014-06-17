'use strict';

angular.module('frontendApp').controller('CrearOportunidadCtrl', [
	'$scope',
	'opportunityServices',
	'accountServices',
	'productServices',
	function($scope, opportunityServices, accountServices, productServices) {
		/* Constructor */
		cargarCuentas();
		cargarProductos();

		/* Feedback messages */
		$scope.feedbackMessages = [];

		/* Business lines */
		$scope.states = [{
			'name': 'Nueva'
		}, {
			'name': 'En evaluación'
		}, {
			'name': 'En negociación'
		}, {
			'name': 'Cerrada'
		}, {
			'name': 'Ganada'
		}, {
			'name': 'Perdida'
		}, {
			'name': 'Abandonada'
		}];

		$scope.probabilities = ['0%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '55%', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '100%'];
		$scope.products = [];
		$scope.accounts = [];

		/* Servicios */
		$scope.crearOportunidad = function(isValid) {
			if (isValid) {
				var oportunidad = prepararOportunidadParaGuardar();
				console.log('$scope.opportunity = ', $scope.opportunity);
				// opportunityServices.create(oportunidad);
				// $scope.feedbackMessages.push({
				// 	type: 'success',
				// 	text: 'La oportunidad [' + $scope.opportunity.name + '] ha sido creada correctamente.'
				// });
				$scope.opportunity = null;
			} else
				$scope.feedbackMessages.push({
					type: 'warning',
					text: 'Falta diligenciar algunos campos del formulario.'
				});
		};


		$scope.closeAlert = function(index) {
			$scope.feedbackMessages.splice(index, 1);
		};

		/* Privados */
		function prepararOportunidadParaGuardar() {
			$scope.opportunity.accountId = $scope.opportunity.accountId._id.$oid;
			$scope.opportunity.productId = $scope.opportunity.productId._id.$oid;
			$scope.opportunity.quantity = parseInt($scope.opportunity.quantity);
			$scope.opportunity.state = $scope.opportunity.state.name;
			$scope.opportunity.order.probability = parseInt($scope.opportunity.order.probability.replace('%', ''));
			$scope.opportunity.order.date = $scope.opportunity.order.date.toJSON();
			console.log($scope.opportunity.order.date);
			return $scope.opportunity;
		}

		function cargarCuentas() {
			var accounts = accountServices.queryAll();
			accounts.then(function(accountList) {
				$scope.accounts = accountList;
			});
		}

		function cargarProductos() {
			var products = productServices.queryAll();
			products.then(function(productList) {
				$scope.products = productList;
			});
		}
	}
]);