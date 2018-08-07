'use strict';
const helmet = require('helmet');

module.exports = (server) => {
  if (process.env.NODE_ENV === 'production') {
    server.use(helmet());
  }
};
