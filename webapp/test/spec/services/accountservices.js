'use strict';

describe('Service: accountServices', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var accountServices;
  beforeEach(inject(function (_accountServices_) {
    accountServices = _accountServices_;
  }));

  it('should do something', function () {
    expect(!!accountServices).toBe(true);
  });

});
