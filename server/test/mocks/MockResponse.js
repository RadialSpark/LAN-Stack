'use strict';

module.exports = class MockResponse {
	constructor (args) {
		args = args || {};
		this.statusCode = args.statusCode;
		this.body = args.body;
    this.url = args.url;
	}

	send(body) {
		this.body = body;
		return this;
	}

	redirect(url) {
		this.url = url;
		this.statusCode = 301;
		return this;
  }

  render(path, file, args) {
    this.path = path;
    this.file = file;
    this.renderArgs = args;
  }
}
