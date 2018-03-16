'use strict';

module.exports = (server) => {
  if (process.env.NODE_ENV === 'production') {
    server.enable('trust proxy');
  }
}
