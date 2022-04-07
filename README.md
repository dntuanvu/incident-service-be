# enabled sonarcloud

## Installation

```bash
$ npm install
```

````bash
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
````

## Running the frontend app

````bash
$ cd frontend
$ npm start

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
````

## API Endpoints

```bash
# register a user
localhost:8080/auth/register
{
    "username": "dntuanvu@gmail.com",
    "password": "P@ssw0rd123",
    "email": "dntuanvu@gmail.com",
    "first_name": "Victor",
    "last_name": "Dinh",
    "role": "admin" (or "user")
}

# login api
localhost:8080/auth/login
{
    "username": "dntuanvu@gmail.com",
    "password": "P@ssw0rd123"
}

# get all incidents
localhost:8080/incident/all GET
# get single incident by ID
localhost:8080/incident/624dacdaa3d10fbd0889fcb0 GET

# raise an incident as an admin
localhost:8080/incident/raise POST
{
    "type": "bugs",
    "detail": "This is the second bugs incident"
}

# assign the incident to a user
localhost:8080/incident/assign POST
{
    "incident_id": "624dacdfa3d10fbd0889fcb2",
    "assignee": "624da19892c639482454d7d1"
}

# acknowledge the incident as a user
localhost:8080/incident/acknowledge POST
{
    "incident_id": "624dacdfa3d10fbd0889fcb2"
}

# resolve the incident as a user
localhost:8080/incident/resolve POST
{
    "incident_id": "624dacdfa3d10fbd0889fcb2"
}

# read details about a certain incident
localhost:8080/incident/:incident_id GET
# delete an incident
localhost:8080/incident DELETE
```
