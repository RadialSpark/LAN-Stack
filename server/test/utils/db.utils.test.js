'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;

const factory = require(`${PROJECT_DIR}/server/test/factories/index.factory`);
const dbUtils = require(`${PROJECT_DIR}/server/utils/db.utils`);
const expect = require('chai').expect;

/**
 * @description Tests for the db.utils module.
 */

describe('DB Utils commit', () => {
    it('should resolve if there is no error', (done) => {
        dbUtils.commit(factory.db.createMockTransaction(false))
            .then(() => {
                done();
            });
    });
    it('should reject if there is an error', (done) => {
        dbUtils.commit(factory.db.createMockTransaction(true))
            .catch((err) => {
                done();
            });
    });
});

describe('DB Utils rollback', () => {
    it('should resolve if there is no error', (done) => {
        dbUtils.rollback(factory.db.createMockTransaction(false))
            .then(() => {
                done();
            });
    });
    it('should reject if there is an error', (done) => {
        dbUtils.rollback(factory.db.createMockTransaction(true))
            .catch((err) => {
                done();
            });
    });
});
