'use strict';

angular.module('frontendApp').controller('TableroControlCtrl', [
	'$scope',
	'_',
	'orderIncomeReportServices',
	function($scope, _, orderIncomeReportServices) {

		/* Constructor */
		var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
		$scope.years = ['2014', '2013', '2012'];
		$scope.selectedYear = null;
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

		$scope.exampleData = [{
			"key": "Series 1",
			"values": [
				['2012', 4667],
				['2013', 5006],
				['2014', 4675],
			]
		}];

		$scope.renderReport = function() {
			var oiReport = orderIncomeReportServices.query($scope.selectedYear);
			oiReport.then(function(result) {
				var newReport = _.map(result, function(entry) {
					var e = {
						month: fromNumberToMonth(entry.month),
						hundred: entry.hundred,
						fifty: entry.fifty,
						ten: entry.ten
					};
					return e;
				});

				buildReport(newReport);
			});			
		};

		/* Privados */
		function render() {
			var oiReport = orderIncomeReportServices.query($scope.selectedYear);
			oiReport.then(function(result) {
				var newReport = _.map(result, function(entry) {
					var e = {
						month: fromNumberToMonth(entry.month),
						hundred: entry.hundred,
						fifty: entry.fifty,
						ten: entry.ten
					};
					return e;
				});

				buildReport(newReport);
			});			
		}

		function buildReport(newReport) {
			$scope.orderIncomeReport = [];
			_.each(months, function(month) {
				addMonth($scope.orderIncomeReport, newReport, month);
			});
		}

		function addMonth(marray, newReport, monthName) {
			var month = findByMonth(newReport, monthName);
			if (!_.isUndefined(month))
				marray.push(month)
		}

		function findByMonth(entryList, monthName) {
			var e = _.find(entryList, function(entry) {
				return entry.month == monthName;
			});
			return e;
		}

		function fromNumberToMonth(month) {
			var months = new Map();
			months.set('01', 'Enero');
			months.set('02', 'Febrero');
			months.set('03', 'Marzo');
			months.set('04', 'Abril');
			months.set('05', 'Mayo');
			months.set('06', 'Junio');
			months.set('07', 'Julio');
			months.set('08', 'Agosto');
			months.set('09', 'Septiembre');
			months.set('10', 'Octubre');
			months.set('11', 'Noviembre');
			months.set('12', 'Diciembre');
			return months.get(month);
		}
	}
]);