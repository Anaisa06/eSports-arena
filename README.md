# eSports arena

## Description
eSports Arena in an API made using [NestJS](https://nestjs.com/), designed to manage videogames tournaments. It uses modern technologies such as TypeORM for database management and JWT for authentication.

## Prerequisites
Before starting, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (if using the default database)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Anaisa06/eSports-arena.git
    cd eSports-arena
    ```

2. **Install the dependencies**:

    Using npm:
    ```bash
    npm install
    ```

## Configuration .env file in the project root

```env
# .env
DB_PASSWORD=MyPassword
DB_NAME=MyDatabase
DB_HOST=localhost
DB_USERNAME=postgres
DB_PORT=5437

JWT_SECRET=YourSecret
X_API_KEY=YourKey
```
## Available Scripts

The project includes several scripts to facilitate development and deployment:

| Command                | Description                                                       |
|------------------------|-------------------------------------------------------------------|
| `npm run start:dev`     | Starts the application in development mode with `nodemon`.        |
| `npm run build`         | Compiles the project using Nest CLI.                              |
| `npm run format`        | Formats the source code with Prettier.                            |
| `npm run start`         | Starts the application in production mode.                        |
| `npm run start:nest-watch` | Starts the application with Nest in watch mode.                |
| `npm run start:debug`   | Starts the application in debug mode with watch.                  |
| `npm run start:prod`    | Starts the compiled application in the `dist/` folder.            |
| `npm run lint`          | Lints the source code with ESLint and applies automatic fixes.    |
| `npm run test`          | Runs unit tests with Jest.                                        |
| `npm run test:watch`    | Runs tests in watch mode.                                         |
| `npm run test:cov`      | Runs tests and generates a coverage report.                       |
| `npm run test:debug`    | Runs tests in debug mode.                                         |
| `npm run test:e2e`      | Runs end-to-end/integration tests.                                |

## Running the Application

### Development Mode

To start the application in development mode, which automatically reloads on code changes:

```bash
npm run start:dev`

```

### Production Mode

## 1- Compile the project:

```bash
npm run build
```

## 2- Start the compiled application:
```bash
npm run start:prod
```

## Testing

To run the tests:
```bash
npm run test
```

To run the tests in watch mode:
```bash
npm run test:watch
```
To run the tests and generate a coverage report:
```bash
npm run test:cov
```
To run the end-to-end tests:
```bash
npm run test:e2e
```


## Linting and Formatting

To lint the code and apply automatic fixes:
```bash
npm run lint
```
To format the code:
```bash
npm run format
```

## The API documentation is automatically generated using Swagger. To access the documentation, start the application and navigate to [/api/v1/docs](http://localhost:3001/api/v1/docs#/) in your browser.

## Also, to see the deployed version of Swagger you can navigate to http://137.184.109.102:3000/api/v1/docs.