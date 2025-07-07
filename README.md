# BE App with Test Cases and Quality Check

NodeAtlas is a robust Express.js and MongoDB API designed for managing users and posts. It features full CRUD operations, comprehensive testing with Mocha and Chai, auto-generated Swagger documentation, and a Dockerized setup for easy deployment.

## Features

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB & Mongoose**: NoSQL database with Mongoose for elegant MongoDB object modeling.
- **User & Post Models**: Defined schemas for users (name, email) and posts (title, body, userId).
- **Full CRUD APIs**: Complete Create, Read, Update, Delete functionalities for both Users and Posts.
- **Swagger/OpenAPI**: Auto-generated API documentation available at `/api/docs`.
- **Unit & Integration Tests**: Thorough testing using Mocha, Chai, and `chai-http`.
- **ESLint & Prettier**: Code quality enforced with Airbnb style guide and Prettier for formatting.
- **SonarLint Ready**: Structured for easy integration with SonarLint for static code analysis.
- **Docker Support**: `Dockerfile` and `docker-compose.yml` for containerized deployment with MongoDB.
- **Environment Variables**: `.env` file support for sensitive configurations.

## Folder Structure

```
.
├── src
│   ├── config (db.js)
│   ├── controllers (userController.js, postController.js)
│   ├── docs (swagger.js)
│   ├── models (User.js, Post.js)
│   ├── routes (userRoutes.js, postRoutes.js)
│   └── server.js
├── test (user.test.js, post.test.js)
├── .env
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd be-app-wth-test-cases
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add your environment variables. Example:

    ```
    PORT=4000
    MONGO_URI=mongodb://localhost:27017/nodeatlas
    ```

    _Note: If using Docker Compose, the `MONGO_URI` will be `mongodb://mongo:27017/nodeatlas`._

## Running the Application

### Locally

1.  Ensure you have a MongoDB instance running locally or update `MONGO_URI` in `.env` to point to your MongoDB server.
2.  Start the server:

    ```bash
    npm start
    ```

    (You might need to add `"start": "node src/server.js"` to your `package.json` scripts.)

### With Docker Compose

This is the recommended way to run the application as it sets up both the Node.js app and a MongoDB instance.

1.  Make sure Docker and Docker Compose are installed on your system.
2.  From the project root, run:

    ```bash
    docker-compose up --build
    ```

    This will build the Docker image for the app and start both the app and MongoDB services.

## API Documentation

Once the server is running (either locally or via Docker Compose), you can access the Swagger UI at:

`http://localhost:4000/api/docs`

## Running Tests

To run the unit and integration tests in `Test DB`, use the following command:

```bash
npm test
```

To run the unit and integration tests with CI/CD, use the following command:

```bash
npm run test-ci
```

## Linting and Formatting

To check for linting errors and format your code:

```bash
# Lint
npm run lint

# Format
npm run format
```

(You might need to add `"lint": "eslint .", "format": "prettier --write ."` to your `package.json` scripts.)

## To use SonarLint with your project:

1.  Install the SonarLint extension in your IDE (e.g., VS Code, IntelliJ IDEA, Eclipse).
2.  Open your project in the IDE. SonarLint should automatically detect the sonar-project.properties file and start analyzing your code based on its configuration.

Important Notes for SonarLint and ESLint Integration:

- The sonar-project.properties file includes settings for ESLint integration (sonar.javascript.linter.eslint.reportPaths and sonar.javascript.linter.eslint.json.force).
- For SonarLint to pick up ESLint issues, you typically need to generate an ESLint report in JSON format.
  (You might need to add `"lint": "eslint . --format json --output-file eslint-report.json",` to your `package.json` scripts.)
