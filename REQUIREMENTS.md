# Environment variables
    POSTGRES_HOST = localhost
    POSTGRES_PORT = 5432
    POSTGRES_DB = udacity
    POSTGRES_TEST_DB = udacity_test
    POSTGRES_USER = postgres
    POSTGRES_PASSWORD = Kunhi-1234
    ENV = div
    BCRYPT_PASSWORD = speak-freind-and-ented
    SALT_ROUNDS = 10
    TOKEN_SECRET = 4dafa9b46860fa6ff97c7a148640a8d3f878655f8830d0469117245fe68351bb2a12e8755a230614651a290886a67995157140597b29dea2cd7e7c796d6fe89a
    REFRESH_TOKEN = fe372c8136fde36a3151ba17903b00d623b442fd1afa8e0824c0cb8b3965e4b546e5a318c23a40ece20284a82332e0b63ec49a4e35491ff51d0dcb688d0b0be8

# Packages instructions

    yarn install @types/bcrypt
    yarn install @types/body-parser
    yarn install @types/cors
    yarn install @types/express
    yarn install @types/jsonwebtoken
    yarn install @types/react
    yarn install bcrypt
    yarn install body-parser
    yarn install cors
    yarn install express
    yarn install jsonwebtoken
    yarn install react
    yarn install typescript
    yarn install -D @types/dotenv
    yarn install -D  @types/jasmine
    yarn install -D  @types/jest
    yarn install -D  @types/node
    yarn install -D  @types/pg
    yarn install -D  db-migrate
    yarn install -D  db-migrate-pg
    yarn install -D  eslint
    yarn install -D  eslint-plugin-react
    yarn install -D  jasmine
    yarn install -D  jasmine-spec-reporter
    yarn install -D  prettier

# Database: create a json file called "database"
## database.json
    {
        "dev": {
            "driver": "pg",
            "host": "localhost",
            "database": "udacity",
            "user": "postgres",
            "password": "Your Password"
        },
        "test": {
            "driver": "pg",
            "host": "localhost",
            "database": "udacity_test",
            "user": "postgres",
            "password": "Your Password"
        }
    }


# Server
## Server Port: 3000
## Databast Port: 5432