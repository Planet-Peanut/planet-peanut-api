<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This project is a simple API built with NestJS and MongoDB Atlas for managing users. It is a simple CRUD API for an app called "Planet Peanut".

## API Documentation (Swagger)

The Swagger API documentation can be accessed at `http://localhost:3000/api`

or

Download the Postman collection and import it into Postman:

[![Run in Postman](https://run.pstmn.io/button.svg)](./Planet%20peanut%20API.postman_collection.json)

## Prerequisites

- .env file with the following variables:

```env
# For production
MONGO_DB_URI=mongodb+srv://skillzy:orangedog@cluster0.5vf3tee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# For development (MongoDB docker container URI)
MONGO_DB_URI_DEV=mongodb://damian:Admin123@localhost:27017
```

## Running the app

```bash
# development mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

## Dependencies

- `@nestjs/mongoose`
- `mongoose`
- `@nestjs/config`
- `class-validator`
- `class-transformer`
- `@nestjs/swagger`
- `bcrypt`
- `eslint`

## Sources

- https://docs.nestjs.com/techniques/mongodb
- https://docs.nestjs.com/techniques/validation
- https://docs.nestjs.com/openapi/introduction
- https://docs.nestjs.com/recipes/crud-generator
- https://docs.nestjs.com/security/encryption-and-hashing
- https://docs.nestjs.com/devtools/ci-cd-integration

## License

Nest is [MIT licensed](LICENSE).
