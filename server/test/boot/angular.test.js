'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const MockServer = require(`${PROJECT_DIR}/server/test/mocks/MockServer`);
const angular = require(`${PROJECT_DIR}/server/boot/03-angular`);
const expect = require('chai').expect;

describe('Angular boot script', () => {
  it('should set the appropriate engine', (done) => {
      let server = new MockServer();
      angular(server);
      expect(server.engines['html']).to.be.truthy;
      done();
  });
  it('should set the appropriate server variables', (done) => {
    let server = new MockServer();
    angular(server);
    expect(server.setValues['view engine']).to.equal('html');
    expect(server.setValues['views']).to.be.truthy;
    done();
  });
  it('should set the appropriate route variables', (done) => {
    let server = new MockServer();
    angular(server);
    expect(server.urlHandlers['*.*']).to.be.truthy;
    expect(server.urlHandlers['/*']).to.be.truthy;
    done();
  });
});
