'use strict';

const constants = require('./constants.utils');
const dbUtils = require('./db.utils');

/**
 * Handle errors, including optional transaction management for handling rollbacks in db errors
 * @param res {object} - thee http response modelect
 * @param status {int} - the http error status
 * @param message {string} - the error message
 * @param transaction {object} - optional, the db transaction instance
 */
const handleError = (res, status, message, transaction) => {
	// if the transaciton was passed in, then we want to rollback
	if (transaction) {
		return dbUtils.rollback(transaction)
			.then((success) => res.status(status).send(message))
			.catch((err) => res.status(500).send(constants.MESSAGES.ROLLBACK_ERROR));
	} else {
		// return the provided status and message
		return res.status(status).send(message);
	}
};

/**
 * Handles sending success responses to the user
 * @param res {object} - the http response modelect
 * @param status {int} - the http status to be sent
 * @param data {any} - the data to be sent in the response body
 * @param transaction {object} - optional transaction for committing to the database
 */
const handleSuccess = (res, status, data, transaction) => {
	if (transaction) {
		return dbUtils.commit(transaction)
			.then((success) => res.status(status).send({ data: data }))
			.catch((err) => handleError(res, 500, constants.MESSAGES.COMMIT_ERROR, transaction));
	 } else {
		return res.status(status).send({ data: data });
	 }
};

module.exports = Object.freeze({
	handleError,
	handleSuccess
});
