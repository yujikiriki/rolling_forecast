'use strict';

angular.module('frontendApp').controller('TableroControlCtrl', function($scope) {
	$scope.exampleData = [{
		"key": "Series 1",
		"values": [
			['Enero', 7.2481659343222],
			['Febrero', 9.2512381306992],
			['Marzo', 11.341210982529],
			['Abril', 14.734820409020],
			['Mayo', 12.387148007542],
			['Junio', 18.436471461827],
			['Julio', 19.830742266977],
			['Agosto', 22.643205829887],
			['Septiembre', 26.743156781239],
			['Octubre', 29.597478802228]
		]
	}];
});