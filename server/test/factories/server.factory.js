'use strict';

const loopback = require('loopback');

/**
 * @description creates a mock loopback server
 */
const createMockServer = () => {
  return {
    isAuthEnabled: false,
    enabledValues: {},
    middleware: [],
    engines: {},
    engine: function(name, engine) {
      this.engines[name] = engine;
    },
    enableAuth: function() {
      this.isAuthEnabled = true;
    },
    enable: function(name) {
      this.enabledValues[name] = true;
    },
    enabled: function(name) {
      return this.enabledValues[name] || false;
    },
    use: function(middleware) {
      this.middleware.push(middleware);
    }
  }
}

module.exports = Object.freeze({
  createMockServer
});
