import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movies API',
      version: '1.0.0',
      description: 'API documentation for the Movies service',
    },
  },
  apis: [
    './src/routes/*.ts', // detects doc in /routes - if any
    './src/docs/*.ts', // detects doc in /doc
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
