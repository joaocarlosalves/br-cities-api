*** TYPESCRIPT REST API

    INTRO
        VER.
        DESCRIPTION
            BRAZILIAN STATES AND CITIES 
        ARCHITECTURE / STRUCTURE
        STATUS: IN PROGRESS

    INSTALL
        REQUIRED 
            ENV: NODE > 18 / ADM
            PRISMA
            PACKAGES / DEPENDENCIES
        SCRIPTS
        PRISMA
            MIGRATIONS

    RUNNING 
        W/ NODE
        W/ DOCKER
        PORT

    FEATURES

    ENDPOINTS
        TYPE / DESCRIPTION
        URL
        HTTP METHODS        
        STATUS

    EXTRAS 
        
    TESTS

    WHAT IS NEXT?

    OUTRO
        USE LICENSE 
        FORK / FOLLOW / GIVE STAR
        CONTACT / SUGGESTIONS



---



### 🔧 Install

> Use **Node.js** version **22**

```bash
# Clone the repository
git clone https://github.com/joaocarlosalves/br-cities-api.git

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
# Start the server in development mode
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