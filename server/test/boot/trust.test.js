'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const factory = require(`${PROJECT_DIR}/server/test/factories/index.factory`);
const trust = require(`${PROJECT_DIR}/server/boot/worker/03-trust`);
const expect = require('chai').expect;

/**
 * @description Tests for the db.utils module.
 */

describe('Trust boot script', () => {
  it('should enable trust proxy in production', (done) => {
    // need to set production to fire the trigger
    process.env.NODE_ENV = 'production';
    let server = factory.server.createMockServer();
    trust(server);
    expect(server.enabled('trust proxy')).to.be.true;
    done();
  });
  it('should not enable anything if not in production', (done) => {
    process.env.NODE_ENV = 'development';
    let server = factory.server.createMockServer();
    trust(server);
    expect(server.enabled('trust proxy')).to.be.false;
    done();
  });
});
