'use strict';

angular.module('frontendApp').controller('LoginController', [
	'$scope',
	'$location',
	'loginServices',
	function($scope, $location, loginServices ) {
		$scope.feedbackMessages = [];

		/* Servicios */
		$scope.autenticar = function(isValid) {
			if (isValid) {
				console.log( '$scope.user = ', $scope.user );
				loginServices.login($scope.user);
				$scope.feedbackMessages.push({
					type: 'success',
					text: 'El usuario [' + $scope.user.name + '] ha sido autenticado'					
				});
				$scope.user = null;
				$location.path('/tablero-control');
			} else
				$scope.feedbackMessages.push({
					type: 'warning',
					text: 'Las credenciales no son correctas.'
				});
		};

		$scope.closeAlert = function(index) {
			$scope.feedbackMessages.splice(index, 1);
		};
	}
]);