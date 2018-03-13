'use strict';
// Angular require zone-node
require('zone.js/dist/zone-node');
require('@angular/core').enableProdMode();

const PROJECT_DIR = require('../../../settings.js').PROJECT_DIR;
const path = require('path');
const loopback = require('loopback');

const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
const provideModuleMap = require('@nguniversal/module-map-ngfactory-loader').provideModuleMap;

const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`${PROJECT_DIR}/dist/server/main.bundle`);

module.exports = (server) => {
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [provideModuleMap(LAZY_MODULE_MAP)]
    })
  );
  server.set('view engine', 'html');
  server.set('views', path.join(PROJECT_DIR, 'dist/browser'));

  // Server static files from /browser
  server.get('*.*', loopback.static(path.join(PROJECT_DIR, 'dist/browser')));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(path.join(PROJECT_DIR, 'dist/browser', 'index.html'), { req });
  });
};
