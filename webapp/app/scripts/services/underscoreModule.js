'use strict';

var underscore = angular.module('underscoreModule', []);
underscore.factory('_', function() {
  return window._;
});