'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const factory = require(`${PROJECT_DIR}/server/test/factories/index.factory`);
const auth = require(`${PROJECT_DIR}/server/boot/worker/01-authentication`);
const expect = require('chai').expect;

/**
 * @description Tests for the db.utils module.
 */

describe('Authentication boot script', () => {
  it('should not fail when enabling auth mode', (done) => {
      let server = factory.server.createMockServer();
      auth(server);
      done();
  });
});
