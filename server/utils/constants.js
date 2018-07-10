'use strict';
// object containing various success/error/info messages
const MESSAGES = Object.freeze({
  ROLLBACK_ERROR: 'Error: Could not rollback data after error occurred.',
  COMMIT_ERROR: 'Error: Could not commit data to the database'
});

module.exports = Object.freeze({
  MESSAGES
});
