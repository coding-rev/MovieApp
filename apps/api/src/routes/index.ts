import express from 'express';
import { movieRouter } from './movieRouter';
import { genreRouter } from './genreRouter';
import { healthRouter } from './healthRouter';

const routers = express();

routers.use('/api/movies', movieRouter);
routers.use('/api', genreRouter)
routers.use('/api', healthRouter)

export { routers };
