const http = require('./http.factory');
const server = require('./server.factory');
const db = require('./db.factory');

module.exports = Object.freeze({
  http,
  server,
  db
});
