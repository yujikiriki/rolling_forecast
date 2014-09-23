'use strict';

angular.module('frontendApp').controller('ActualizarUsuarioController', [
	'$scope',
	'$routeParams',	
	'userServices',
	function($scope, $routeParams, userServices) {
		/* Feedback messages */
		$scope.feedbackMessages = [];

		/* Roles */
		$scope.roles = [ 'Administrador', 'Ejecutivo' ];

		/* Constructor */
		{
			$scope.idUsuario = $routeParams.idUsuario;
			cargarUsuario();
		}

		/* Servicios */
		$scope.actualizarUsuario = function(isValid) {
			if (isValid) {
				console.log( '$scope.user = ', $scope.user );
				userServices.update($scope.idUsuario, $scope.user);
				$scope.feedbackMessages.push({
					type: 'success',
					text: 'El usuario [' + $scope.user.name + '] ha sido actualizado correctamente.'
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

		/* Private */
		function cargarUsuario() {		
			var usuario = userServices.get($scope.idUsuario);
			usuario.then(function(result){
				$scope.user = {
					name: result.name,
					password: result.password,
					role: result.role
				};
			});
		}
	}
]);