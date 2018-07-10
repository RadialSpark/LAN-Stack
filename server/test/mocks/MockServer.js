'use strict';

function MockServer() {
  this.isAuthEnabled = false;
  this.enabledValues = {};
  this.middleware = [];
  this.engines = {};
  this.urlHandlers = {};
  this.setValues = {};
}

MockServer.prototype.enableAuth = function() {
  this.isAuthEnabled = true;
}

MockServer.prototype.enable = function(name) {
  this.enabledValues[name] = true;
}

MockServer.prototype.enabled = function(name) {
  return this.enabledValues[name] || false;
}

MockServer.prototype.use = function(middleware) {
  this.middleware.push(middleware);
}

MockServer.prototype.engine = function(engineName, engine) {
  this.engines[engineName] = engine;
}

MockServer.prototype.set = function(key, value) {
  this.setValues[key] = value;
}

MockServer.prototype.get = function(key, value) {
  this.urlHandlers[key] = value;
}

module.exports = MockServer;
