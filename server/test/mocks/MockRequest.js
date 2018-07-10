'use strict';

function MockRequest(args) {
  this.values = {};
  for (const key in args) {
    this[key] = args[key];
  }
}

MockRequest.prototype.get = function(key) {
  return this.values[key];
}

module.exports = MockRequest;
