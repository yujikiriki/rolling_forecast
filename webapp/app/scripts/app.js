'use strict';

angular
  .module('frontendApp', [
    'reportModule',    
    'opportunityModule',
    'productModule',
    'accountModule',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'nvd3ChartDirectives',
    'underscoreModule',
    'mgcrea.ngStrap'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/tablero-control.html',
        controller: 'TableroControlCtrl'
      })
// Tablero de control      
      .when('/tablero-control', {
        templateUrl: 'views/tablero-control.html',
        controller: 'TableroControlCtrl'
      })
// Cuentas      
      .when('/crear-cuenta', {
        templateUrl: 'views/crear-cuenta.html',
        controller: 'CrearCuentaController'
      })
      .when('/cuentas', {
        templateUrl: 'views/maestro-cuentas.html',
        controller: 'MaestroCuentasCtrl'
      })
// Productos      
      .when('/crear-producto', {
        templateUrl: 'views/crear-producto.html',
        controller: 'CrearCuentaController'
      })            
      .when('/productos', {
        templateUrl: 'views/maestro-productos.html',
        controller: 'MaestroProductosCtrl'
      })
// Oportunidades
      .when('/crear-oportunidad', {
        templateUrl: 'views/crear-oportunidad.html',
        controller: 'CrearOportunidadCtrl'
      })            
      .when('/oportunidades', {
        templateUrl: 'views/maestro-oportunidades.html',
        controller: 'MaestroOportunidadesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });      
  });