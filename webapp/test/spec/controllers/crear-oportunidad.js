'use strict';

describe('Controller: CrearOportunidadCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var CrearOportunidadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearOportunidadCtrl = $controller('CrearOportunidadCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
