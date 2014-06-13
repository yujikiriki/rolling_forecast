'use strict';

angular.module('frontendApp').controller('CrearOportunidadCtrl', [
	'$scope',
	'opportunityServices',
	'accountServices',
	'productServices',
	function($scope, opportunityServices, accountServices, productServices) {
		/* Construct or */
		cargarCuentas();
		cargarProductos();

		/* Feedback messages */
		$scope.feedbackMessages = [];
		/* Business lines */
		$scope.states = [{
			'name': 'Nueva'
		}, {
			'name': 'En ejecucion'
		}, {
			'name': 'Perdida'
		}, {
			'name': 'Congelada'
		}];

		$scope.products = [];
		$scope.accounts = [];



		/* Servicios */
		$scope.crearOportunidad = function(isValid) {
			if (isValid) {
				var oportunidad = prepararOportunidadParaGuardar();
				opportunityServices.create(oportunidad);
				$scope.feedbackMessages.push({
					type: 'success',
					text: 'La oportunidad [' + $scope.opportunity.name + '] ha sido creada correctamente.'
				});
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