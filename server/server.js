'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const throng = require('throng');

// establish the number of process based off environment variable config, cpus, or default 1
const workers = process.env.WEB_CONCURRENCY || require('os').cpus().length || 1;

const app = module.exports = loopback();

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

// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;
  // start the app if `$ node app.js`
  if (require.main === module) {
    // spawn the processes
    throng({
      workers: workers,
      start: app.start,
      lifetime: Infinity
    });
  }
});
