'use strict';

describe('Service: opportunityServices', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var opportunityServices;
  beforeEach(inject(function (_opportunityServices_) {
    opportunityServices = _opportunityServices_;
  }));

  it('should do something', function () {
    expect(!!opportunityServices).toBe(true);
  });

});
