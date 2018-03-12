'use strict';
const helmet = require('helmet');

module.exports = (server) => {
  if (process.env.NODE_ENV === 'production') {
    server.use(helmet());
    server.enable('trust proxy');
    server.use((req, res, next) => {
      if (!req.secure) return res.redirect([
        'https://',
        req.get('Host'),
        req.url
      ].join( '' ));
      next();
    });
  }
}
