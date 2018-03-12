'use strict';

const constants = require('../models/utils/constants.utils');
const dataFactory = require('./data-factory');
const httpUtils = require('../models/utils/http.utils');
const expect = require('chai').expect;

/**
 * @description Tests for the http.utils module.
 */

describe('HTTP Utils handleError', () => {
    let status = 400;
    let body = 'failed';
    it('should return a mock HTTP response with the correct state', (done) => {
        let response = httpUtils.handleError(dataFactory.createMockResponse(), status, body, null);
        expect(response.mockStatus).to.equal(status);
        expect(response.mockBody).to.equal(body);
        done();
    });
    it('should successfully rollback and return a mock HTTP response with the correct state', (done) => {
        httpUtils.handleError(dataFactory.createMockResponse(), status, body, dataFactory.createMockTransaction(false))
            .then((response) => {
                expect(response.mockStatus).to.equal(status);
                expect(response.mockBody).to.equal(body);
                done();
            });
    });
    it('should fail to rollback and return a mock HTTP response with the correct state', (done) => {
        httpUtils.handleError(dataFactory.createMockResponse(), status, body, dataFactory.createMockTransaction(true))
            .then((response) => {
                expect(response.mockStatus).to.equal(500);
                expect(response.mockBody).to.equal(constants.messages.ROLLBACK_ERROR);
                done();
            });
    });
});

describe('HTTP Utils handleSuccess', () => {
    let status = 200;
    let body = 'success';
    it('should return a mock HTTP response with the correct state', (done) => {
        let response = httpUtils.handleSuccess(dataFactory.createMockResponse(), status, body, null);
        expect(response.mockStatus).to.equal(status);
        expect(response.mockBody.data).to.equal(body);
        done();
    });
    it('should successfully commit and return a mock HTTP response with the correct state', (done) => {
        httpUtils.handleSuccess(dataFactory.createMockResponse(), status, body, dataFactory.createMockTransaction(false))
            .then((response) => {
                expect(response.mockStatus).to.equal(status);
                expect(response.mockBody.data).to.equal(body);
                done();
            });
    });
    it('should successfully commit and return a mock HTTP response with the correct state', (done) => {
        httpUtils.handleSuccess(dataFactory.createMockResponse(), status, body, dataFactory.createMockTransaction(true))
            .then((response) => {
                expect(response.mockStatus).to.equal(500);
                expect(response.mockBody).to.equal(constants.messages.COMMIT_ERROR);
                done();
            });
    });
});
