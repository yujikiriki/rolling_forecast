'use strict';

describe('Service: Salesreportservice', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var Salesreportservice;
  beforeEach(inject(function (_Salesreportservice_) {
    Salesreportservice = _Salesreportservice_;
  }));

  it('should do something', function () {
    expect(!!Salesreportservice).toBe(true);
  });

});
