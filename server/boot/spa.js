const path = require('path');

module.exports = (server) => {
  // Use the page namespace
  let router = server.loopback.Router();
  router.get('/page', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
  router.get('/page/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
  // have the root url redirect to the spa
  router.get('/', (req, res) => {
    res.redirect('/page');
  });
  server.use(router);
};
