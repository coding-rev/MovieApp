import express from 'express';
import { movieRouter } from './movieRouter';
import { genreRouter } from './genreRouter';
import { healthRouter } from './healthRouter';
import { metricsMiddleware, metricsHandler } from '@/services/prometheus';

const routers = express();

routers.use(metricsMiddleware);
routers.get('/metrics', metricsHandler);
routers.use('/api/movies', movieRouter);
routers.use('/api', genreRouter)
routers.use('/api', healthRouter)

export { routers };
