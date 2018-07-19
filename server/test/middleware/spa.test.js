'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const MockRequest = require(`${PROJECT_DIR}/server/test/mocks/MockRequest`);
const MockResponse = require(`${PROJECT_DIR}/server/test/mocks/MockResponse`);
const spa = require(`${PROJECT_DIR}/server/middleware/spa`);
const expect = require('chai').expect;

describe('SPA middleware', () => {
  it('should call next if api is in url', (done) => {
    let req = new MockRequest({
      path: '/api/testendpoint'
    });
    let res = new MockResponse();
    spa(req, res, () => {});
    expect(res.path).to.be.undefined;
    expect(res.file).to.be.undefined;
    expect(res.renderArgs).to.be.undefined;
    done();
  });
  it('should call render if not api', (done) => {
    let req = new MockRequest({
      path: '/login'
    });
    let res = new MockResponse();
    spa(req, res, () => {});
    expect(res.path).to.be.truthy;
    expect(res.file).to.be.truthy;
    expect(res.renderArgs).to.be.truthy;
    done();
  })
})
