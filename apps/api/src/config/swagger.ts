import swaggerJsdoc from 'swagger-jsdoc';
import { env } from '@/config/env';
import path from 'path';

const routesGlob = path.resolve(process.cwd(), 'src/routes/**/*.ts');

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs',
      version: '1.0.0',
      description: 'API for Movies, fully documented with OpenAPI 3.0',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Local development server',
      },
    ],
  },
  apis: [routesGlob],
});
