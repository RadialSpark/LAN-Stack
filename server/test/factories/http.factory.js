'use strict';

/**
 * @description creates a mock http response for basic testing
 */
const createMockResponse = (args) => {
  args = args || {};
    return {
        statusCode: args.statusCode,
        body: args.body,
        url: args.url,
        status: function(statusCode) {
            this.statusCode = statusCode;
            return this;
        },
        send: function(body) {
            this.body = body;
            return this;
        },
        redirect: function(url) {
          this.url = url;
          console.log('made it');
          this.statusCode = 301;
        }
    };
}

/**
 * @description creates a mock http request
 * @param {Object} args http request properties to be set
 */
const createMockRequest = (args) => {
  let req = {
    values: {},
    get: function(name) {
      return this.values[name];
    }
  };
  for (let arg in args) {
    req[arg] = args[arg];
  }
  return req;
}

module.exports = Object.freeze({
    createMockResponse,
    createMockRequest
});
