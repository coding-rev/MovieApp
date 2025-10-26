import "dotenv/config";
import cors from 'cors';
import express, { Express } from 'express';
import { routers } from "@/routes/index"
import { loggerMiddleware } from '@/middleware/logger';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@/docs/swagger';
import { env } from "@/config/env";
import helmet from 'helmet';
import { limiter } from "@/middleware/rateLimiting";

export function createApp(): Express {
    const app = express();

    // Security Headers
    app.use(helmet());
    
    // Rate Limiting
    app.use(limiter);
    
    // CORS
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
    
    // Express req parser
    app.use(express.json());
    
    // Pino logger
    app.use(loggerMiddleware);
    
    // App routers
    app.use('', routers);
    
    // Swagger ui
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    // 404 Handler
    app.use((req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
    // Error Handler
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(500).json({ error: 'Internal Server Error' });
    });

    return app;
}
