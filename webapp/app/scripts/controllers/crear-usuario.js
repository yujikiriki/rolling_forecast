'use strict';

angular.module('frontendApp').controller('CrearUsuarioController', [
	'$scope',
	'userServices',
	function($scope, userServices) {
		/* Feedback messages */
		$scope.feedbackMessages = [];

		/* Departamens and cities */
		$scope.roles = [ 'Administrador', 'Ejecutivo' ];

		/* Servicios */
		$scope.crearUsuario = function(isValid) {
			if (isValid) {
				console.log( '$scope.user = ', $scope.user );
				userServices.create($scope.user);
				$scope.feedbackMessages.push({
					type: 'success',
					text: 'El usuario [' + $scope.user.name + '] ha sido creado correctamente.'
				});
				$scope.user = null;
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