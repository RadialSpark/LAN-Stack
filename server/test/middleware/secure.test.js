'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const MockRequest = require(`${PROJECT_DIR}/server/test/mocks/MockRequest`);
const MockResponse = require(`${PROJECT_DIR}/server/test/mocks/MockResponse`);
const secure = require(`${PROJECT_DIR}/server/middleware/secure`);
const expect = require('chai').expect;

describe('Secure middleware', () => {
  it('should not redirect if secured', (done) => {
    let req = new MockRequest({
      url: 'abc.com',
      secure: true
    });
    let res = new MockResponse();
    secure(req, res, () => {});
    // callback doesnt get called here, so check outside
    expect(res.statusCode).to.be.undefined;
    done();
  });
  it('should redirect if not secured', (done) => {
    let req = new MockRequest({
      url: 'abc.com',
      secure: false
    });
    let res = new MockResponse();
    secure(req, res, () => {});
    expect(res.statusCode).to.equal(301);
    done();
  })
})
