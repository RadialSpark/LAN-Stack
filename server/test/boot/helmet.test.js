'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const MockServer = require(`${PROJECT_DIR}/server/test/mocks/MockServer`);
const helmet = require(`${PROJECT_DIR}/server/boot/02-helmet`);
const expect = require('chai').expect;

describe('Helmet boot script', () => {
  it('should not fail when environment is production', (done) => {
    // need to set production to fire the trigger
    process.env.NODE_ENV = 'production';
    let server = new MockServer();
    expect(server.middleware.length).to.equal(0);
    helmet(server);
    expect(server.middleware.length).to.equal(1);
    done();
  });
  it('should not fail when environment is not production', (done) => {
    process.env.NODE_ENV = 'development';
    let server = new MockServer();
    expect(server.middleware.length).to.equal(0);
    helmet(server);
    expect(server.middleware.length).to.equal(0);
    done();
  });
});
