'use strict';

describe('Controller: MaestroProductosCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var MaestroProductosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MaestroProductosCtrl = $controller('MaestroProductosCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
