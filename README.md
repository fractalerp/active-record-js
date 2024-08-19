[![Node.js CI](https://github.com/fractalerp/active-record-js/actions/workflows/ci.yml/badge.svg)](https://github.com/fractalerp/active-record-js/actions/workflows/ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/486b143d9023a951f36d/maintainability)](https://codeclimate.com/github/fractalerp/active-record-js/maintainability)
[![Dependencies](https://img.shields.io/librariesio/release/npm/@fractalerp/active-record-js)](https://libraries.io/npm/@fractalerp%2Factive-record-js)
[![Vulnerabilities](https://snyk.io/test/github/fractalerp/active-record-js/badge.svg)](https://snyk.io/test/github/fractalerp/active-record-js)
![Node 11](https://img.shields.io/badge/node-11.5.x-green.svg)
![Npm 6](https://img.shields.io/badge/npm-6.4.x-green.svg)
![Webpack 5](https://img.shields.io/badge/webpack-5.20.2-green.svg)
[![codecov](https://codecov.io/gh/fractalerp/active-record-js/branch/main/graph/badge.svg)](https://codecov.io/gh/fractalerp/active-record-js)
[![Coverage Status](https://coveralls.io/repos/github/fractalerp/active-record-js/badge.svg?branch=main)](https://coveralls.io/github/fractalerp/active-record-js?branch=main)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/fractalerp/active-record-js/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![code style: Eslint](https://img.shields.io/badge/eslint_rules-%5E9.9.0-ff69b4.svg?style=flat-square)](https://eslint.org)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ffractalerp%2Factive-record-js.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ffractalerp%2Factive-record-js?ref=badge_shield)
[![MIT](https://img.shields.io/badge/mit-blue.svg)](http://opensource.org/licenses/mit)

[![npm](https://nodei.co/npm/@fractalerp/active-record-js.png)](https://www.npmjs.com/package/@fractalerp/active-record-js)

[![Download Status](https://img.shields.io/npm/dt/@fractalerp/active-record-js.svg)](https://www.npmjs.com/package/@fractalerp/active-record-js)

# ACTIVE RECORD JS
A library responsible for representing business data. 

This library follows the `Active Record Pattern` by building a wrapper on top of popular orm such as [Mongoose](https://www.npmjs.com/package/mongoose) and [Sequelize](https://www.npmjs.com/package/sequelize) to support all kinds of databases

## ⚙️ How to use the package in project
1. You should create the following environment variables in your node project.
```env
RDBMS_DATABASE_URI="mysql://DATBASE_USER:DATABASE_PASSWORD@DATABASE_HOST:DATABASE_PORT/DATABASE_DB"
NOSQL_DATABASE_URI="mongodb://DATABASE_HOST:DATABASE_PORT/DATABASE_DB"
NOSQL_DATABASE_ADAPTER="mongodb"
```
2. Once the variables have been set. You should create a model base on the active record `SchemaProperty`. See example below

```typescript
import { ActiveRecord } from "@fractalerp/active-record-js"

export interface ITaskModelDocument {
  name: string;
  description: string;
}

const TaskModelSchema = {
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: null
  }
};

export const TaskModel = new ActiveRecord<ITaskModelDocument>("Task", TaskModelSchema);

```
3. Then use its methods to perform data management. The following methods are supported;

|Method|Description|
|------------------|-----------|
|`find`|returns list of data objects|
|`findOne`|returns one data item|
|`create`|save item to the data store|
|`update`|updates the record in the store|
|`delete`|delete item from the data store|

Since we support all kinds of databases. The following are the respective methods of the two kinds of databases.

This only applies to `NOSQL databases`

|Method|Description|
|------------------|-----------|
|`aggregate`|peform aggregate action based on a pipeline|
|`index`|create an index in the document store|

This only applies to `Relational databases`

|Method|Description|
|------------------|-----------|
|`query`|create a raw `SQL` to send to database|
|`beginTransaction`|start a transaction|
|`commitTransaction`|persist a transaction|
|`rollbackTransaction`|rollback a transaction|

Other than that, all the other ORM respective methods for `Sequelize` and `Mongoose` are supported by default.

4. Finally you can use the model to peform data action. See example.

```typescript
// create task
const task = await TaskModel.create({
    name: 'Use fractalerp active record js',
    description: 'Change all models'
});

// Find one task
const task = await TaskModel.findOne({ id: 'cbdabs-29232323-msasd'});
```

5. You can also use the underlying ORM model and instance methods

```typescript
// create task
const filter = { };
const countTasks = await TaskModel.model.countDocuments(filter);

```

## 🫶 Projects using this package
See the projects using this package in action.
- [Fractal Js](https://github.com/fractalerp/fractal-js)
- [Fractalerp core](https://github.com/fractalerp/fractal-core)

## 🪲 Issues, suggestions and feature requests

We are actively maintaining this library, please report any issues or suggestion for improvement at https://github.com/fractalerp/active-record-js/issues

## 👩‍💻 Development and contribution
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI

To contribute, fork and clone.

    > git clone https://github.com/fractalerp/active-record-js.git

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
|`build:release`|Build app optimized for production|
|`build:development`|Build app optimized for debugging.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.ts` files.|

