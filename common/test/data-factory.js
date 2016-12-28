/**
 * @description creates a mock http response for basic testing
 */
let createMockResponse = () => {
    return {
        mockStatus: null,
        mockBody: null,
        status: function(statusCode) {
            this.mockStatus = statusCode;
            return this;
        },
        send: function(body) {
            this.mockBody = body;
            return this;
        }
    };
}

/**
 * @description creates a mock loopback transaction object
 * @param hasError {boolean} indicate whether or not an error should be imitated in the transaction object
 */
let createMockTransaction = (hasError) => {
    return {
        err: hasError,
        commit: function(callback) {
            // toggle for testing that the rollback is successfully executed if there is an error with committing
            this.err = !this.err;
            // return the callback with the original error state
            return callback(!this.err);
        },
        rollback: function(callback) {
            return callback(this.err);
        }
    };
}

module.exports = {
    createMockResponse,
    createMockTransaction
};