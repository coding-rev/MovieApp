import "dotenv/config";
import cors from 'cors';
import express, { Express } from 'express';
import { routers } from "@/routes/index"
import { loggerMiddleware } from '@/middleware/logger';
import swaggerUi from 'swagger-ui-express';
import redoc from 'redoc-express';
import { swaggerSpec } from '@/docs/swagger';
import { env } from "@/config/env";


export function createApp(): Express {
    const app = express();

    app.use(cors({
        origin: function(origin, callback) {
            // allow requests with no origin (like mobile apps or curl)
            if (!origin) return callback(null, true);
            if (env.CORS_ALLOWED_ORIGINS.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
            return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: false // set true; if cookies or auth headers needed 
    }));
    app.use(express.json());  
    app.use(loggerMiddleware);
    app.use('', routers);
    
    // Swagger + Redoc
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/redoc', redoc({ title: 'Movies API Docs', specUrl: '/docs/json' }));
    app.get('/docs/json', (req, res) => res.json(swaggerSpec));

    app.use((req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(500).json({ error: 'Internal Server Error' });
    });

    return app;
}
