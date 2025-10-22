import "dotenv/config";
import cors from 'cors';
import express, { Express } from 'express';
import { routers } from "@/routes/index"
import { loggerMiddleware } from '@/middleware/logger';

export function createApp(): Express {
    const app = express();

    app.use(cors());
    app.use(express.json());  
    app.use(loggerMiddleware);
    app.use('', routers);
    app.use((req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(500).json({ error: 'Internal Server Error' });
    });

    return app;
}
