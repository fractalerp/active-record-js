[![Build Status](https://github.com/fractalhr/active-record-js.svg?branch=master)](https://github.com/fractalhr/active-record-js)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/fractalhr/active-record-js.svg?style=flat-square)](https://codeclimate.com/github/fractalhr/active-record-js)
[![Dependency Status](https://david-dm.org/fractalhr/active-record-js.svg)](https://david-dm.org/fractalhr/active-record-js)
[![Dev Dependency Status](https://david-dm.org/fractalhr/active-record-js.svg#info=devDependencies)](https://david-dm.org/fractalhr/active-record-js#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/fractalhr/active-record-js.svg)](https://snyk.io/test/github/fractalhr/active-record-js)
![Node 11](https://img.shields.io/badge/node-11.5.x-green.svg)
![Npm 6](https://img.shields.io/badge/npm-6.4.x-green.svg)
![Webpack 5](https://img.shields.io/badge/webpack-5.20.2-green.svg)
[![codecov](https://codecov.io/gh/fractalhr/active-record-js/branch/master/graph/badge.svg)](https://codecov.io/gh/fractalhr/active-record-js)
[![Coverage Status](https://coveralls.io/repos/github/fractalhr/active-record-js/badge.svg?branch=master)](https://coveralls.io/github/fractalhr/active-record-js?branch=master)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/fractalhr/active-record-js/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![code style: Tslint Latest](https://img.shields.io/badge/tslint_rules-latest-ff69b4.svg?style=flat-square)](https://github.com/buzinas/tslint-eslint-rules)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ffractalhr%2Factive-record-js.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ffractalhr%2Factive-record-js?ref=badge_shield)
[![Apache License, Version 2.0](https://img.shields.io/badge/mit-blue.svg)](http://opensource.org/licenses/mit)

[![npm](https://nodei.co/npm/active-record-js.png)](https://www.npmjs.com/package/active-record-js)

# ACTIVE RECORD JS
A library responsible for representing business data. 

This library follows the `Active Record Pattern` by building a wrapper on top of popular orm such as [Mongoose](https://www.npmjs.com/package/mongoose) and [Sequelize](https://www.npmjs.com/package/sequelize) to support all kinds of databases


## Issues, suggestions and feature requests
We are actively maintaining this boilerplate, please report any issues or suggestion for improvement at https://github.com/fractalhr/active-record-js/issues

## Development and contribution
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI

To contribute, fork and clone.

    > git clone https://github.com/fractalhr/active-record-js.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

To automatically compile, bundle and push code changes to the running test project, run:

    > npm start

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm run test:unit

Run the unit test continuously during development:

    > npm run test:dev

## Scripts
While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Build the project and monitor source and config for changes and rebuild. Start the dev server|
|`watch`|Build the project and monitor source and config for changes and rebuild.|
|`emit`|Output javascript code|
|`test`|Runs lint, build, unit tests with mocha and generates a coverage report|
|`test:dev`|Runs mocha and watches for changes to re-run tests; does not generate coverage reports.|
|`test:unit`|Runs unit tests with mocha and generates a coverage report.|
|`build:prod`|Build app optimized for production|
|`build:dev`|Build app optimized for debugging.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.ts` files.|
