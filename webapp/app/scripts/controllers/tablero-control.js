// 'use strict';

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

		$scope.businessLines = ['MESY','MCC','MCC','MCV','MSW','MEC','G'];
		$scope.selectedBusinessLine = null;

		$scope.exampleData = [{
			"key": "Order income",
			"values": [
				['2012', 0],
				['2013', 0],
				['2014', 300],
			]
		}];

		$scope.orderIncomeStates = [{
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

		/* Public */
		$scope.renderReport = function() {
			renderOrderIncomeReport();
			renderSalesReport();
		};

		$scope.renderReportByBusinessLine = function() {
			renderOrderIncomeReportByBusinessLine();
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

		function renderOrderIncomeReportByBusinessLine() {
			var oiReport = orderIncomeReportServices.queryBusinessLine($scope.selectedYear, $scope.selectedBusinessLine);
			oiReport.then(function(result) {
				var newReport = _.map(result, function(entry) {
					var e = {
						month: fromNumberToMonth(entry.month),
						nueva: entry.nueva,
						enEvaluacion: entry.enEvaluacion,
						enNegociacion: entry.enNegociacion,
						cerrada: entry.cerrada,
						ganada: entry.ganada,
						perdida: entry.perdida,
						abandonada: entry.abandonada
					};
					return e;
				});
				buildOrderIncomeReport(newReport);				
			});
		}

		function renderOrderIncomeReport() {
			var oiReport = orderIncomeReportServices.query($scope.selectedYear);
			oiReport.then(function(result) {
				var newReport = _.map(result, function(entry) {
					var e = {
						month: fromNumberToMonth(entry.month),
						nueva: entry.nueva,
						enEvaluacion: entry.enEvaluacion,
						enNegociacion: entry.enNegociacion,
						cerrada: entry.cerrada,
						ganada: entry.ganada,
						perdida: entry.perdida,
						abandonada: entry.abandonada
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
			var months = {};
			months['01'] = 'Enero';
			months['02'] = 'Febrero';
			months['03'] = 'Marzo';
			months['04'] = 'Abril';
			months['05'] = 'Mayo';
			months['06'] = 'Junio';
			months['07'] = 'Julio';
			months['08'] = 'Agosto';
			months['09'] = 'Septiembre';
			months['10'] = 'Octubre';
			months['11'] = 'Noviembre';
			months['12'] = 'Diciembre';
			return months[month];
		}
	}
]);