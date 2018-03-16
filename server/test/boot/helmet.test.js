'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const factory = require(`${PROJECT_DIR}/server/test/factories/index.factory`);
const helmet = require(`${PROJECT_DIR}/server/boot/worker/02-helmet`);
const expect = require('chai').expect;

/**
 * @description Tests for the db.utils module.
 */

describe('Helmet boot script', () => {
  it('should not fail when environment is production', (done) => {
    // need to set production to fire the trigger
    process.env.NODE_ENV = 'production';
    let server = factory.server.createMockServer();
    helmet(server);
    done();
  });
  it('should not fail when environment is not production', (done) => {
    process.env.NODE_ENV = 'development';
    let server = factory.server.createMockServer();
    helmet(server);
    done();
  });
});
