# Piiquante

# Build a secure API for food reviews app

## Prerequisite ##

* npm

* node

## Installation ##

Clone this repo `git clone https://github.com/Iso-Doss/Piiquante`

[//]: # (Open the folder `cd Piiquante`)

Create `images` folder.

Run `npm install` from within the project directory.

## Configure environment information ##

Duplicate the sample environment file `.env.example` to `.env`

Configure the environment file by filling in the values for the keys:

```
MONGOOSE_DB_NAME='The data base name to connect to the Mongo DB database.'
MONGOOSE_DB_USER='The username to connect to the Mongo DB database.'
MONGOOSE_DB_PASSWORD='The password to connect to the Mongo DB database.'

PORT='The port on which your application should start. Default is port 3000.'
```

## Using the app ##

Run `npm start` from within the project directory.

## Swagger Url ##

Swagger Url: `localhost:3000/api-docs`

## Endpoints Url ##

* Signup: `localhost:3000/api/auth/signup` (POST)

* Login: `localhost:3000/api/auth/login` (POST)

* Create a sauce: `localhost:3000/api/sauces` (POST)

* Read a sauce: `localhost:3000/api/sauces/:sauceId` (GET)

* Read all sauce: `localhost:3000/api/sauces` (GET)

* Update a sauce: `localhost:3000/api/sauces/:sauceId` (PUT)

* Delete a sauce: `localhost:3000/api/sauces/:stuffId` (DELETE)

* Like or Dislike a sauce: `localhost:3000/api/sauces/:sauceId/like` (POST)
