const constants = require('../models/utils/constants.utils');
const dataFactory = require('./data-factory');
const dbUtils = require('../models/utils/db.utils');
const expect = require('chai').expect;

/**
 * @description Tests for the db.utils module. 
 */

describe('DB Utils commit', () => {
    it('should resolve if there is no error', (done) => {
        dbUtils.commit(dataFactory.createMockTransaction(false))
            .then(() => {
                done();
            });
    });
    it('should reject if there is an error', (done) => {
        dbUtils.commit(dataFactory.createMockTransaction(true))
            .catch((err) => {
                done();
            });
    });
});

describe('DB Utils rollback', () => {
    it('should resolve if there is no error', (done) => {
        dbUtils.rollback(dataFactory.createMockTransaction(false))
            .then(() => {
                done();
            });
    });
    it('should reject if there is an error', (done) => {
        dbUtils.rollback(dataFactory.createMockTransaction(true))
            .catch((err) => {
                done();
            });
    });
});