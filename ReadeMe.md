# `NC-news`

To construct and host a backend server to store information relating to northcoder news. The Information stored includes topics, users, articles and comments. functionality will involve the ability to:

- request information on all topics
- request user information by username
- request article information by article ID
- update an article by article ID
- Post new comments to articles by article ID
- request information of all comments from an article by article ID
  - information can be sorted by any valid column, defaults to created_at.
  - information can be ordered in ascending or descending order, defaults to descending.
- request information on all articles
  - information can be sorted by any valid column, defaults to created_at.
  - information can be ordered in ascending or descending order, defaults to descending.
  - can filter your query to return information for articles relating to a) a specific author
    b) a specific topic
- update comments by comment ID
- delete comments by comment ID

---

## `Getting Started`

These instructions will provide you with a copy of the project on your local machine for development and testing purposes. See deployment for a link to a hosted system. notes on how to deploy the project on a live system.

On your local machine using terminal navigate to the directory where you want the repository to be situated.

in the terminal type:

```bash
git clone <Repository URL>

npm i

```

### `Prerequisites`

Node.js version needs to be v12.10.0 or higher.

dependencies that need to be installed to run the application:

- express: ^4.17.1,
- knex: ^0.20.4,
- pg: ^7.14.0
- cors: ^2.8.5

---

---

### `Creating scripts`

A step by step series of examples that tell you how to get a development env running

creating the following scripts in your package.json:

```
		"setup-dbs": "psql -f ./db/setup.sql",
		"seed": "knex seed:run",
		"test-utils": "mocha spec/utils.spec.js",
		"test": "mocha spec/app.spec.js",
		"migrate-make": "knex migrate:make",
		"migrate-latest": "knex migrate:latest",
		"migrate-rollback": "knex migrate:rollback",
```

### `Create a knexfile.js`

In the route directory create a JS file called Knexfile

This file should look like this

```
// in ./knexfile.js
const dbConfig = {
  client: 'pg',
  connection: {
    database: 'imdb',
    // for linux:
    // username: '',
    // password: ''
  },
  seeds: {
    directory: './db/seeds',
  },
};

```

### `Create a local database`

run the following script:

```
npm run setup-dbs
```

Seed the Database with development data by running the following script:

```
npm run seed
```

you can use the following scripts to roll your database version forwards (latest) and backwards (rollback):

```
npm run migrate-latest

npm run migrate-rollback
```

---

## `Running the tests`

In order to run the application and utils tests, run the following scripts:

```
npm test-utils
npm test
```

## `Links`

Please click here for the Hosted database:

[Heroku] https://be-nc-news-2.herokuapp.com/api - link to hosted webpage

## `Authors`

- **Andrew Falls** - _Initial work_ - [Afalls89](https://github.com/Afalls89)
