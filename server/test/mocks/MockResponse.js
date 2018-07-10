'use strict';

function MockResponse(args) {
  args = args || {};
  this.statusCode = args.statusCode;
  this.body = args.body;
  this.url = args.url;
}

MockResponse.prototype.status = function(statusCode) {
  this.statusCode = statusCode;
  return this;
}

MockResponse.prototype.send = function(body) {
  this.body = body;
  return this;
}

MockResponse.prototype.redirect = function(url) {
  this.url = url;
  this.statusCode = 301;
  return this;
}

module.exports = MockResponse;
