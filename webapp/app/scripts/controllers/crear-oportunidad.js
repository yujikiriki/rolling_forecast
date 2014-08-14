'use strict';

angular.module('frontendApp').controller('CrearOportunidadCtrl', [
	'$scope',
	'userServices',
	'opportunityServices',
	'accountServices',
	'productServices',
	function($scope, userServices, opportunityServices, accountServices, productServices) {
		/* Constructor */
		cargarCuentas();
		cargarProductos();
		cargarResponsables();

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
		$scope.responsibles = [];

		/* Servicios */
		$scope.crearOportunidad = function(isValid) {
			if (isValid) {
				var oportunidad = prepararOportunidadParaGuardar();
				console.log('$scope.opportunity = ', $scope.opportunity);
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

		$scope.openOrderDate = function($event) {
    	$event.preventDefault();
    	$event.stopPropagation();
    	$scope.openedOrderDate = true;
  	}; 

		$scope.openSaleDate = function($event) {
    	$event.preventDefault();
    	$event.stopPropagation();
    	$scope.openedSaleDate = true;
  	}; 

		/* Privados */
		function prepararOportunidadParaGuardar() {
			$scope.opportunity.accountId = $scope.opportunity.accountId._id.$oid;
			$scope.opportunity.productId = $scope.opportunity.productId._id.$oid;
			$scope.opportunity.userId = $scope.opportunity.responsible._id.$oid;
			$scope.opportunity.quantity = parseInt($scope.opportunity.quantity);
			$scope.opportunity.state = $scope.opportunity.state.name;
			prepararOrdenParaGuardar();			
			prepararVentaParaGuardar();
			return $scope.opportunity;
		}

		function prepararOrdenParaGuardar() {
			$scope.opportunity.order.probability = parseInt($scope.opportunity.order.probability.replace('%', ''));
		  var orderDate = $scope.opportunity.order.date.toJSON();		
		  $scope.opportunity.order.date = orderDate;
			$scope.opportunity.order.year = orderDate.substring( 0, 4 );
			$scope.opportunity.order.month = orderDate.substring( 5, 7 );			
		}

		function prepararVentaParaGuardar() {
			$scope.opportunity.sale.probability = parseInt($scope.opportunity.sale.probability.replace('%', ''));
		  var saleDate = $scope.opportunity.sale.date.toJSON();		
		  $scope.opportunity.sale.date = saleDate;
			$scope.opportunity.sale.year = saleDate.substring( 0, 4 );
			$scope.opportunity.sale.month = saleDate.substring( 5, 7 );			
		}

		function cargarResponsables() {
			var responsibles = userServices.queryResponsibles( 'Ejecutivo' );
			responsibles.then(function(responsibleList) {
				$scope.responsibles = responsibleList;
			});
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