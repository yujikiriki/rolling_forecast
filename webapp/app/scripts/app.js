'use strict';

angular
  .module('frontendApp', [
    'accountModule',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/crear-cuenta.html',
        controller: 'CrearCuentaController'
      })
      .when('/crearcuenta', {
        templateUrl: 'views/crear-cuenta.html',
        controller: 'CrearCuentaController'
      })
      .when('/cuentas', {
        templateUrl: 'views/maestro-cuentas.html',
        controller: 'MaestrocuentasCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });