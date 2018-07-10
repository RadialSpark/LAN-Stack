// Angular require zone-node
require('zone.js/dist/zone-node');
require('@angular/core').enableProdMode();

const loopback = require('loopback');
const path = require('path');
const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
const provideModuleMap = require('@nguniversal/module-map-ngfactory-loader').provideModuleMap;
const PROJECT_DIR = require('../../settings.js').PROJECT_DIR;

const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`${PROJECT_DIR}/dist/server/main.bundle`);

module.exports = (app) => {
	app.engine(
		'html',
		ngExpressEngine({
			bootstrap: AppServerModuleNgFactory,
			providers: [provideModuleMap(LAZY_MODULE_MAP)]
		})
	);

	app.set('view engine', 'html');
	app.set('views', path.join(PROJECT_DIR, 'dist/browser'));

	// app static files from /browser
	app.get('*.*', loopback.static(path.join(PROJECT_DIR, 'dist/browser')));

	// All regular routes use the Universal engine
	app.get('/*', (req, res) => {
		res.render(path.join(PROJECT_DIR, 'dist/browser', 'index.html'), { req });
	});
}
