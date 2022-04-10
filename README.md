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
$ npm install
$ npm run dev

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
````

## Testing

```bash
To test we can run the auth/register api as the detail below to create either an admin or user then login as a newly created admin, we can create as many as incident we want using the button under /dashboard page

After we created multiple incidents, we can start assigning the incident to user by click on the "Action" button on each row. In the modal, we can retrieve the user's id from token return by login api to put in the text field and start assigning .

Then, we logout and login again with another user account which was recently assigned by admin . As a user, we can acknowledge or resolve whatever incident assigned by them. There will be an error if we acknowledge/resolve an incident which is not belong to user.

I'm still revamping the page and to apply the IAM Provider (highly possible will be using Auth0 to maintain user pool) as well as to use FCM as a notification center to notify user when
    - admin assign an incident to user > notification will be sent to user
    - user start acknowledging or resolving the incident > notification will be sent to admin

Technology stacks
    - For Backend, I'm using NodeJS and with the framework NestJS to help me well structure the code
    - For Frontend, I'm using ReactJS but I'm planning to apply NextJS since it will be a production ready framework for ReactJS to support SEO / SSR

Thank you so much and since I'm in rush of getting interview so if we're ok, I'm able to enhance the UI by using ant design / tailwind css framework to make it nicer
```

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
