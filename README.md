### About

• [e-mail](hello@joaocarlosalves.dev)

• [linkedin](https://www.linkedin.com/in/joaocarlosalvesdev)

---

<br>

### Install

> Use **Node.js** version **22.14.0** (also works in v18.20.8)

```bash
# Clone the repository
git clone https://github.com/joaocarlosalves/br-cities-api.git

# Access project folder
cd br-cities-api

# Install dependencies
npm install

# Generate the SQLite database with Prisma
npx prisma validate --config ./prisma.config.ts
npx prisma db seed
npx prisma migrate dev --name init 
npx prisma generate
```

### Run, Test and Build

```bash
# Start the server in development mode (http://localhost:4000)
npm run dev

# Run automated tests
npm run test

# Generate the test coverage report
npm run coverage

# Generate the production build
npm run build

# Running in Docker
docker compose up
```

### Endpoints

```bash
# Data from Prisma / SQLite DB
# Base URL/Port
http://localhost:4000

# State info
/state/:uf

# All Cities from a State
/state/:uf/cities

# Paginated Cities from a State
/state/:uf/cities/:page/:limit

# Static JSON Files (not paginated)
# All Cities from a State 
/static/state/:uf
```

### States List

- **ac**: Acre
- **al**: Alagoas
- **ap**: Amapá
- **am**: Amazonas
- **ba**: Bahia
- **ce**: Ceará
- **df**: Distrito Federal
- **es**: Espírito Santo
- **go**: Goiás
- **ma**: Maranhão
- **mt**: Mato Grosso
- **ms**: Mato Grosso do Sul
- **mg**: Minas Gerais
- **pa**: Pará
- **pb**: Paraíba
- **pr**: Paraná
- **pe**: Pernambuco
- **pi**: Piauí
- **rj**: Rio de Janeiro
- **rn**: Rio Grande do Norte
- **rs**: Rio Grande do Sul
- **ro**: Rondônia
- **rr**: Roraima
- **sc**: Santa Catarina
- **sp**: São Paulo
- **se**: Sergipe
- **to**: Tocantins

---

<br>

### Project Dependencies

| Library              | Description                                                         |
|----------------------|---------------------------------------------------------------------|
| `@prisma/client`     | Client for accessing the database using Prisma ORM.                 |
| `bcryptjs`           | Password hashing and comparison with bcrypt support.                |
| `cookie-parser`      | Parses cookies received in requests.                                |
| `cors`               | Enables CORS (cross-origin resource sharing).                       |
| `dotenv`             | Loads environment variables from a `.env` file.                     |
| `express`            | Fast and minimalist web framework for Node.js APIs.                 |
| `express-rate-limit` | Limits requests to protect against DDoS attacks.                    |
| `express-validator`  | Middleware for validating request data.                             |
| `helmet`             | Sets HTTP security headers to protect the application.              |
| `http-errors`        | Creates HTTP errors with appropriate messages and codes.            |
| `jsonwebtoken`       | Creates and verifies JWT tokens for authentication.                 |
| `morgan`             | HTTP request logging middleware.                                    |
| `uuid`               | Generates universally unique identifiers (UUIDs).                   |
| `xss-clean`          | Sanitizes inputs to prevent XSS attacks.                            |
| `zod`                | Schema validator and parser for TypeScript.                         |

---

<br>

### Development Dependencies

| Library                           | Description                                                       |
|-----------------------------------|-------------------------------------------------------------------|
| `@types/bcryptjs`                 | Types for the bcryptjs library.                                   |
| `@types/cookie-parser`            | Type definitions for cookie-parser.                               |
| `@types/cors`                     | Types for the CORS middleware.                                    |
| `@types/dotenv`                   | Type definitions for the dotenv library.                          |
| `@types/express`                  | Type definitions for Express.                                     |
| `@types/jest`                     | Type definitions for Jest.                                        |
| `@types/jsonwebtoken`             | Type definitions for jsonwebtoken.                                |
| `@types/morgan`                   | Types for the morgan library.                                     |
| `@types/node`                     | Type definitions for Node.js global APIs.                         |
| `@types/supertest`                | Type definitions for the supertest library.                       |
| `@types/uuid`                     | Types for UUID generation.                                        |
| `@typescript-eslint/eslint-plugin`| ESLint rules specific to TypeScript.                              |
| `@typescript-eslint/parser`       | ESLint parser that understands TypeScript.                        |
| `eslint`                          | Linting tool to keep code consistent.                             |
| `husky`                           | Git hooks to run scripts on commits.                              |
| `jest`                            | Modern testing framework with coverage and mocks.                 |
| `prettier`                        | Automatic code formatter with standard rules.                     |
| `prisma`                          | Prisma CLI and engine for migrations and client generation.       |
| `supertest`                       | Tests HTTP routes by simulating requests.                         |
| `ts-jest`                         | Enables Jest to work directly with TypeScript.                    |
| `ts-node-dev`                     | Runs and automatically reloads TypeScript in development.         |
| `tsx`                             | TypeScript executor with support for ESM, JSX, and loaders.       |
| `typescript`                      | JavaScript superset with static typing.                           |

---

<br>

### Use License

• [e-mail](hello@joaocarlosalves.dev/)

• [linkedin](https://www.linkedin.com/in/joaocarlosalvesdev/)

---
