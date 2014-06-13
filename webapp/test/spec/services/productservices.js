'use strict';

describe('Service: Productservices', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var Productservices;
  beforeEach(inject(function (_Productservices_) {
    Productservices = _Productservices_;
  }));

  it('should do something', function () {
    expect(!!Productservices).toBe(true);
  });

});
