# enabled sonarcloud

## Installation

```bash
$ npm install
```

```bash 
## Running the app as a docker

docker-compose up

## Running the app as cli

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints
```bash
# register a user
localhost:8080/auth/register
# login api
localhost:8080/auth/login

# get all incidents
localhost:8080/incident/all GET
# get all incidents
localhost:8080/incident/624dacdaa3d10fbd0889fcb0 GET

# raise an incident as an admin
localhost:8080/incident/raise POST
# assign the incident to a user
localhost:8080/incident/assign POST
# acknowledge the incident as a user
localhost:8080/incident/acknowledge POST
# resolve the incident as a user
localhost:8080/incident/resolve POST
# read details about a certain incident
localhost:8080/incident/:incident_id GET
# delete an incident
localhost:8080/incident DELETE