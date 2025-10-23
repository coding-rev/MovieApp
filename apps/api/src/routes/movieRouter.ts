import express from 'express';
import { movie } from '@/controllers/movieController';
import { movieCreateValidator, movieUpdateValidator } from '@/validator/movieValidator';
import { validationChecker } from '@/validator/validationHandler';

const movieRouter = express.Router();

movieRouter.post(
    '/',
    movieCreateValidator,
    validationChecker,
    movie.create
);
movieRouter.get('/', movie.listMovies);
movieRouter.get('/:id', movie.get);
movieRouter.patch(
    '/:id',
    movieCreateValidator,
    movieUpdateValidator,
    movie.update
);
movieRouter.delete('/:id', movie.delete);

export { movieRouter };