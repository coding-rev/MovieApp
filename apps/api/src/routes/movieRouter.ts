import express from 'express';
import { movie } from '@/controllers/movieController';

const movieRouter = express.Router();

movieRouter.post('/', movie.create);
movieRouter.get('/', movie.listMovies);
movieRouter.get('/:id', movie.get);
movieRouter.put('/:id', movie.update);
movieRouter.delete('/:id', movie.delete);

export { movieRouter };