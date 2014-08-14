'use strict';

angular.module('frontendApp').controller('TableroControlCtrl', [
	'$scope',
	'_',
	'orderIncomeReportServices',
	'salesReportServices',
	function($scope, _, orderIncomeReportServices, salesReportServices) {

		/* Attributes */
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
			"key": "Order income",
			"values": [
				['2012', 0],
				['2013', 0],
				['2014', 300],
			]
		}
		];

		/* Public */
		$scope.renderReport = function() {
			renderOrderIncomeReport();
			renderSalesReport();
		};

		/* Private */
		function queryOrderIncomeTotal() {

		}

		function renderSalesReport() {
			var salesReport = salesReportServices.query($scope.selectedYear);
			salesReport.then(function(result) {
				var newReport = _.map(result, function(entry) {
					var e = {
						month: fromNumberToMonth(entry.month),
						hundred: entry.hundred,
						fifty: entry.fifty,
						ten: entry.ten
					};
					return e;
				});
				buildSalesReport(newReport);
			});			
		}

		function renderOrderIncomeReport() {
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
				buildOrderIncomeReport(newReport);
			});
		}

		function buildOrderIncomeReport(newReport) {
			$scope.orderIncomeReport = [];
			_.each(months, function(month) {
				addMonth($scope.orderIncomeReport, newReport, month);
			});
		}

		function buildSalesReport(newReport) {
			$scope.salesReport = [];
			_.each(months, function(month) {
				addMonth($scope.salesReport, newReport, month);
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