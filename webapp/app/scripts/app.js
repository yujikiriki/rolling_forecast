'use strict';

angular
  .module('frontendApp', [
    'opportunityModule',
    'productModule',
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