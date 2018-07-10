'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const MockServer = require(`${PROJECT_DIR}/server/test/mocks/MockServer`);
const secure = require(`${PROJECT_DIR}/server/boot/04-secure`);
const expect = require('chai').expect;

describe('Secure boot script', () => {
  it('should trust proxy when environment is production', (done) => {
    // need to set production to fire the trigger
    process.env.NODE_ENV = 'production';
    let server = new MockServer();
    secure(server);
    expect(server.enabled('trust proxy')).to.be.true;
    done();
  });
  it('should not trust proxy when environment is not production', (done) => {
    process.env.NODE_ENV = 'development';
    let server = new MockServer();
    secure(server);
    expect(server.enabled('trust proxy')).to.be.false;
    done();
  });
});
