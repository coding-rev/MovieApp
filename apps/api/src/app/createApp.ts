import "dotenv/config";
import express, { Express } from 'express';
import cors from 'cors';
import { routers } from "@/routes/index"

export function createApp(): Express {
    const app = express();

    app.use(cors());
    app.use(express.json());  
    app.use('', routers);
    
    app.use((req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(500).json({ error: 'Internal Server Error' });
    });

    return app;
}
