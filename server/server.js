'use strict';

// Angular require zone-node
require('zone.js/dist/zone-node');
require('@angular/core').enableProdMode();

const loopback = require('loopback');
const boot = require('loopback-boot');
const throng = require('throng');

const PROJECT_DIR = require('../settings.js').PROJECT_DIR;
const path = require('path');

const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
const provideModuleMap = require('@nguniversal/module-map-ngfactory-loader').provideModuleMap;

const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`${PROJECT_DIR}/dist/server/main.bundle`);

// establish the number of process based off environment variable config, cpus, or default 1
const workers = process.env.WEB_CONCURRENCY || require('os').cpus().length || 1;

/**
 * @description function fired for the master process -- this is where app setup should happen
 */
const master = () => {
  const bootOptions = {
    'appRootDir': __dirname,
    'bootDirs': ['boot/master']
  };
  boot(app, bootOptions, (err) => {
    if (err) throw err;
    // omit starting a app here -- master thread is primarily responsible for setup in this case
  });
};

/**
 * @description function for worker processes -- these are the actual processes that handle client requests
 */
const worker = () => {
  const bootOptions = {
    'appRootDir': __dirname,
    'bootDirs': ['boot/worker']
  };
  // Bootstrap the application, configure models, datasources and middleware.
  // Sub-apps like REST API are mounted via boot scripts.
  boot(app, bootOptions, (err) => {
    if (err) throw err;
    // start the app if `$ node app.js`
    if (require.main === module)
      app.start();
  });
};

const app = module.exports = loopback();

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
app.get('/', (req, res) => {
  res.render(path.join(PROJECT_DIR, 'dist/browser', 'index.html'), { req });
});

app.start = () => {
  // start the web app
  return app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log(`Web app listening at: ${baseUrl}`);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log(`Browse your REST API at ${baseUrl}${explorerPath}`);
    }
  });
};

// spawn the processes
throng({
  workers: workers,
  master: master,
  start: worker,
  lifetime: Infinity
});
