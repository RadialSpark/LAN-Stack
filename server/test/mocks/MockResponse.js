'use strict';

module.exports = class MockResponse {
  /**
   * @description inits the Mock Response with provided args
   * @param {Object} args object with fields statusCode, body, and url
   */
	constructor(args) {
		args = args || {};
		this.statusCode = args.statusCode;
		this.body = args.body;
    this.url = args.url;
	}

  /**
   * @description Mock implementation of the send method
   * @param {Object} body response body
   * @return {MockResponse} the calling mock response
   */
	send(body) {
		this.body = body;
		return this;
	}

  /**
   * @description Mock implementation of the redirect method
   * @param {String} url url to be redirected to
   * @return {MockResponse} the calling mock response
   */
	redirect(url) {
		this.url = url;
		this.statusCode = 301;
		return this;
  }

  /**
   * @description Mock implementation of the render method
   * @param {String} path path to the resource to render
   * @param {String} file resource to be rendered
   * @param {Object} args additional args
   */
  render(path, file, args) {
    this.path = path;
    this.file = file;
    this.renderArgs = args;
  }
};
