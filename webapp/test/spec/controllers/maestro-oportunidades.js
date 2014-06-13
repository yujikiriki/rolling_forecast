'use strict';

describe('Controller: MaestroOportunidadesCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var MaestroOportunidadesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MaestroOportunidadesCtrl = $controller('MaestroOportunidadesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
