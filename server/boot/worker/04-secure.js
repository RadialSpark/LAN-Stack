'use strict';

const PROJECT_DIR = require('../../../settings').PROJECT_DIR;
const secure = require(`${PROJECT_DIR}/server/middleware/secure`);

module.exports = (server) => {
  if (process.env.NODE_ENV === 'production') {
    server.use(secure);
  }
}
