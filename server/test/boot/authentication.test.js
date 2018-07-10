'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const MockServer = require(`${PROJECT_DIR}/server/test/mocks/MockServer`);
const auth = require(`${PROJECT_DIR}/server/boot/01-authentication`);
const expect = require('chai').expect;

describe('Authentication boot script', () => {
  it('should not fail when enabling auth mode', (done) => {
      let server = new MockServer();
      expect(server.isAuthEnabled).to.be.false;
      auth(server);
      expect(server.isAuthEnabled).to.be.true;
      done();
  });
});
