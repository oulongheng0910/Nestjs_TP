# TP4 GraphQL

NestJS + GraphQL + TypeORM project for categories and products.

## Requirements

- Node.js
- Docker

## Setup

```bash
npm install
cp .env.example .env
```

The default `.env.example` matches the Docker MySQL container.

## Database

```bash
npm run db:up
```

This starts MySQL 8.4 in Docker, exposes it on `localhost:3307`, and creates the `tp4` database automatically.

To stop the database:

```bash
npm run db:down
```

## Run The App

```bash
npm run start:dev
```

The app listens on `http://localhost:3000` by default. The GraphQL endpoint is:

```text
http://localhost:3000/graphql
```

## Useful Commands

```bash
npm run build
npm test
npm run test:e2e
```

## Example GraphQL Operations

```graphql
mutation {
  createCategory(name: "Books") {
    id
    name
  }
}
```

```graphql
mutation {
  createProduct(name: "NestJS Guide", price: 19.99, categoryId: 1) {
    id
    name
    price
    category {
      id
      name
    }
  }
}
```

```graphql
query {
  products {
    id
    name
    price
    category {
      id
      name
    }
  }
}
```
