'use strict';

angular.module('frontendApp').controller('CrearCuentaController', [
	'$scope',
	'accountServices',
	function($scope, accountServices) {
		/* Feedback messages */
		$scope.feedbackMessages = [];

		/* Departamens and cities */
		$scope.departaments = [{
			'name': 'Antioquia',
			'cities': ['Medellin', 'Rionegro']
		}, {
			'name': 'Cundinamarca',
			'cities': ['Bogota', 'Chia']
		}, {
			'name': 'Amazonas',
			'cities': ['Leticia']
		}];

		/* Servicios */
		$scope.crearCuenta = function(isValid) {
			if (isValid) {
				$scope.account.departament = $scope.account.departament.name;
				accountServices.create($scope.account);
				$scope.feedbackMessages.push({
					type: 'success',
					text: 'La cuenta [' + $scope.account.name + '] ha sido creada correctamente.'
				});
				$scope.account = null;
			} else
				$scope.feedbackMessages.push({
					type: 'warning',
					text: 'Falta diligenciar algunos campos del formulario.'
				});
		};

		$scope.closeAlert = function(index) {
			$scope.feedbackMessages.splice(index, 1);
		};
	}
]);