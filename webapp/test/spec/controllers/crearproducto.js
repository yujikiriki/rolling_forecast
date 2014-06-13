'use strict';

describe('Controller: CrearproductoCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var CrearproductoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearproductoCtrl = $controller('CrearproductoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
