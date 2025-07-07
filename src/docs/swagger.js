import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeAtlas API',
      version: '1.0.0',
      description:
        'A simple Express.js API for managing users and posts, documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated ID of the user',
            },
            name: {
              type: 'string',
              description: 'The name of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'The date the user was added',
            },
          },
          example: {
            id: '60d0fe4f5311236168a109ca',
            name: 'John Doe',
            email: 'john.doe@example.com',
            date: '2021-06-21T10:00:00.000Z',
          },
        },
        Post: {
          type: 'object',
          required: ['title', 'body', 'userId'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated ID of the post',
            },
            title: {
              type: 'string',
              description: 'The title of the post',
            },
            body: {
              type: 'string',
              description: 'The body content of the post',
            },
            userId: {
              type: 'string',
              description: 'The ID of the user who created the post',
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'The date the post was created',
            },
          },
          example: {
            id: '60d0fe4f5311236168a109cb',
            title: 'My First Post',
            body: 'This is the content of my first post.',
            userId: '60d0fe4f5311236168a109ca',
            date: '2021-06-21T10:00:00.000Z',
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

export default specs;
