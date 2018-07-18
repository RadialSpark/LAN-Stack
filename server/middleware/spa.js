'use strict';

const path = require('path');
const PROJECT_DIR = require('../../settings.js').PROJECT_DIR;

module.exports = (req, res, next) => {
  const parts = req.path.split('/');

  // added this check because there have been some issues with spa not affording api access
  if (parts[1] && parts[1].toLowerCase() === 'api') return next();
  res.render(path.join(PROJECT_DIR, 'dist/browser', 'index.html'), { req });
}
