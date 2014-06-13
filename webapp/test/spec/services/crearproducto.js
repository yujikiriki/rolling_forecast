'use strict';

describe('Service: Crearproducto', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var Crearproducto;
  beforeEach(inject(function (_Crearproducto_) {
    Crearproducto = _Crearproducto_;
  }));

  it('should do something', function () {
    expect(!!Crearproducto).toBe(true);
  });

});
