'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const factory = require(`${PROJECT_DIR}/server/test/factories/index.factory`);
const secure = require(`${PROJECT_DIR}/server/middleware/secure`);
const expect = require('chai').expect;

describe('Secure middleware', () => {
  it('should redirect if not secured', (done) => {
    let req = factory.http.createMockRequest({
      url: 'abc.com',
      secure: true
    });
    let res = factory.http.createMockResponse();
    secure(req, res, () => {});
    // callback doesnt get called here, so check outside
    expect(res.statusCode).to.be.undefined;
    done();
  });
  it('should not redirect if secured', (done) => {
    let req = factory.http.createMockRequest({
      url: 'abc.com',
      secure: false
    });
    let res = factory.http.createMockResponse();
    secure(req, res, () => {});
    expect(res.statusCode).to.equal(301);
    done();
  })
})
