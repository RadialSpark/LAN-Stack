// Load the appropriate webpack bundling config based on node environment
// trim to make sure that there is no extra whitespace in order to  not break switch
switch (process.env.NODE_ENV.trim()) {
  case 'development':
    module.exports = require('./config/webpack.development');
    break;
  case 'production':
    module.exports = require('./config/webpack.production');
    break;
  case 'testing':
    module.exports = require('./config/webpack.testing');
    break;
  default:
    console.log('Invalid NODE_ENV.')
    break;
}
