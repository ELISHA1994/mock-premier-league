# Mock-Premier-League
API that serves the latest scores of fixtures of matches in a “Mock Premier League”

## Features

**Admin accounts**
- signup/login
- manage teams (add, remove, edit, view)
- create fixtures (add, remove, edit, view)
- Generate unique links for fixture

**Users accounts**

- signup/login
- view teams
- view completed fixtures
- view pending fixtures
- search fixtures/teams

## Technologies

- NodeJs
- TypeScript
- MongoDB
- Redis
- Docker
- POSTMAN
- Jest
- Express


## Requirements and Installation

To install and run this project you would need to have listed stack installed:

- Node.js

- To run:

```sh
git clone <https://github.com/ELISHA1994/mock-premier-league.git>
cd mock-premier-league
npm install
npm run start:dev
```

## Testing

```sh
npm test
```

## API-ENDPOINTS

- V1

`- POST /api/v1/user/signup Create user account`

`- DELETE /api/api/v1/user/:userId Delete a user`

`- POST /api/v1/user/login Login a user`

`- GET /api/v1/user/:userId Get a user`

`- GET /api/v1/user Get all user`

`- POST /api/v1/team Admin can add a team`

`- DELETE /api/v1/team/:teamId Admin can remove team`

`- PUT /api/v1/team/:teamId Admin can edit a team`

`- GET /api/v1/team/:teamId Admin can view a single team`

`- GET /api/v1/teams Admin can view all teams`

`- POST /api/v1/fixture Admin can add a fixture`

`- DELETE /api/v1/fixture/:fixtureId Admin can remove fixture`

`- PUT /api/v1/fixture/:fixtureId Admin can update fixture`

`- GET /api/v1/fixture/:fixtureId Admin can view a single fixture`

`- GET /api/v1/fixtures Admin can view all fixture`

`- GET /api/v1/fixtures/completed User can view all completed fixtures`

`- GET /api/v1/fixtures/pending User can view all pending fixtures`

## API

The API is hosted at
[https://mock-premier-league-elisha.herokuapp.com/](https://mock-premier-league-elisha.herokuapp.com/)

## API Documentation
[https://documenter.getpostman.com/view/5947307/UVkmRxaV](https://documenter.getpostman.com/view/5947307/UVkmRxaV)

## Author

Elisha Dutse Bello

