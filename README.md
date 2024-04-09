# NodeJS with GraphQL sandbox

This repo was create with the purpose to learn GraphQL with NodeJS and express.

## How to run

This project uses a json-server api as its source of truth instead of in memory data to be more realistic.

The dataset is stored under the "db" folder in the "db.json" file. To serve this file run `yarn db` or `npm run db`.

Once the API with the data is running, run `yarn dev` or `npm run dev` to run the GraphQL API.

## How to run with Docker

A docker container can be spinned up with the commands: `docker image build -t node-graphql-sandbox .`
and `docker container run -p 5000:5000 --rm node-graphql-sandbox`.

## How to test

This project uses Jest as its test framework, to run the tests, run `yarn test` or `npm run test`. After the test run, the code coverage will be captured and stored in the "coverage" folder.