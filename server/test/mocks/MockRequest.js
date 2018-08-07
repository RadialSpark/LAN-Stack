'use strict';

module.exports = class MockRequest {
  /**
   * @description inits the mock request with the provided args
   * @param {Object} args args to be set as values
   */
	constructor(args) {
		this.values = {};
		for (const key in args) {
      if (args.hasOwnProperty(key)) {
        this[key] = args[key];
      }
		}
	}

  /**
   * @description Mock implementation of the get method
   * @param {String} key key of the value to be returned
   * @return {Any} the value for the provided key
   */
	get(key) {
		return this.values[key];
	}
};
