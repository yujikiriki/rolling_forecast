'use strict';

describe('Controller: MaestrocuentasCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var MaestrocuentasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MaestrocuentasCtrl = $controller('MaestrocuentasCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
