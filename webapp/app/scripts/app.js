'use strict';

angular
  .module('frontendApp', [
    'accountModule',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/crear-cuenta.html',
        controller: 'CrearCuentaController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

