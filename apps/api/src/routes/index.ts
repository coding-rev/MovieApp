import express from 'express';
import { movieRouter } from './movieRouter';
import { healthRouter } from './healthRouter';

const routers = express();

routers.use('/api', movieRouter);
routers.use('/api', healthRouter)

export { routers };
