'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const throng = require('throng');

// set the root directory for other modules to reference
global.__root = __dirname;

// establish the number of process based off environment variable config, cpus, or default 1
const workers = process.env.WEB_CONCURRENCY || require('os').cpus().length || 1;

/**
 * @description function fired for the master process -- this is where server setup should happen
 */
const master = () => {
  const bootOptions = {
    'appRootDir': __dirname,
    'bootDirs': ['boot/master']
  };
  boot(app, bootOptions, (err) => {
    if (err) throw err;
    // omit starting a server here -- master thread is primarily responsible for setup in this case
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
    // start the server if `$ node server.js`
    if (require.main === module)
      app.start();
  });
};

const app = module.exports = loopback();

app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log(`Web server listening at: ${baseUrl}`);
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
