## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```
## API Reference (A postman colletion provided in the project, pls follow it!)


Base Url: http://localhost:5000/api/v1

#### User Service

|HTTP Method|URL|Description|
|---|---|---|
|`POST`|{baseUrl}/users | Create new User |
|`PUT`|{baseUrl}/users/{userId} | Update User by ID |
|`DELETE`|{baseUrl}/users/{userId} | Delete User by ID |
|`GET`|{baseUrl}/users?limit={limit}&&offset={offset} | Get All Users with Paging |

