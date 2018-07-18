require('dotenv').config();

const fs = require('fs');
const path = require('path');

const environmentFilesDirectory = path.join(__dirname, './src/environments');
const targetEnvironmentFileName = 'environment.prod.ts';

const NODE_ENV = process.env.NODE_ENV || 'development';

const isProduction = NODE_ENV === 'production' ? true : false;
let apiUrl;

// change these for each application
switch (NODE_ENV) {
  case 'production':
    apiURL = 'http://localhost:5000/api';
    break;
  case 'test':
    apiUrl = 'http://localhost:5000/api';
    break;
  default:
    apiUrl = 'http://localhost:5000/api';
    break;
}

const template = `export const environment = { production: ${isProduction}, apiUrl: '${apiUrl}' };`;

// Write environment file
fs.writeFileSync(path.join(environmentFilesDirectory, targetEnvironmentFileName), template);
