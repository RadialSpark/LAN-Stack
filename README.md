# LAN STACK [![CircleCI](https://circleci.com/gh/RadialSpark/LAN-Stack.svg?style=svg&circle-token=7643d40a16d2365477b90581f9465166f6386087)](https://circleci.com/gh/RadialSpark/LAN-Stack)
Quickstart for building Loopback/Angular applications

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [Git] (https://git-scm.com/)
* [Node] (https://nodejs.org/en/)
* [Heroku CLI] (https://devcenter.heroku.com/articles/heroku-cli)

### Installing

Clone the repository into a terminal opening a terminal, navigate to the desired location for repository cloning and using git to clone the repository.

```
cd myProjectFolder
git clone https://github.com/RadialSpark/www-radialspark-com.git
```

In the terminal, navigate to the root directory and install all of the project dependencies.

```
cd wwww-radialspark.com
npm install
```

Copy the .env-template and rename the copy .env.

Start the application from Heroku CLI

```
heroku local
```

If you are looking to do only client side work and do not require the serve, then you can start only the client app with a webpack server
```
npm run build
```

## Running the tests

For running all tests

```
npm run test
```

For running only server side tests

```
npm run test:server
```

For running only client side tests

```
npm run test:client
```

## Deployment

This application is intended to be easily deployed to Heroku. In order to deploy the production branch of this repository, create a heroku application and configure the deploy settings to allow automatic deploys from the master branch. This can also be mirrored to deploy UAT or DEV applications as well.

## Built With

* [Loopback](https://loopback.io/) - Server side web framework
* [Angular](https://angular.io/) - Client side framework

## Contributing

Contact Thomas Wilkins (twilkins@radialspark.com) for opportunities to contribute to this project
