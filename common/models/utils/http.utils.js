/**
 * Handle errors, including optional transaction management for handling rollbacks in db errors
 * @param res {object} - thee http response modelect
 * @param status {int} - the http error status
 * @param message {string} - the error message
 * @param transaction {object} - optional, the db transaction instance
 */
let handleError = (res, status, message, transaction) => {
	// if the transaciton was passed in, then we want to rollback
	if (transaction) {
		transaction.rollback((err) => {
			if (err) {
				console.log(err);
				return res.status(500).send('Error: Could not rollback data after error occurred.');
			}
			return res.status(status).send(message);
		});
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
let handleSuccess = function(res, status, data, transaction) {
	if (transaction) {
		transaction.commit(function(err) {
			// if there is an error in committing, then rollback and send a 500 to the user
			if (err) { return handleError(res, 500, 'Error: Could not commit data to the database', transaction); }
			// otherwise return the committed data
			return res.status(status).send({ data: data });
		});
	 } else {
		return res.status(status).send({ data: data });
	 }
};

module.exports = {
	handleError,
	handleSuccess
};
