'use strict';

angular
  .module('frontendApp', [
    'loginModule',
    'userModule',
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
// Constantes  
  .constant('backend_server_ip', '54.164.84.236')
// Rutas  
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
// Usuarios      
      .when('/crear-usuario', {
        templateUrl: 'views/crear-usuario.html',
        controller: 'CrearUsuarioController'
      })
      .when('/usuarios', {
        templateUrl: 'views/maestro-usuarios.html',
        controller: 'MaestroUsuariosCtrl'
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