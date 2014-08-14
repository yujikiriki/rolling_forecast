'use strict';

angular.module('frontendApp').directive('ngMenubar', [function() {
	return {
		restrict: 'E',
		templateUrl: 'views/menubar.html'
	}
}]);