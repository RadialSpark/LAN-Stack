'use strict';

module.exports = (req, res, next) => {
  if (!req.secure)  return res.redirect([
    'https://',
    req.get('Host'),
    req.url
  ].join( '' ));
  next();
}
