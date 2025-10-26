import express from 'express';
import { movie } from '@/controllers/index';
import { validate } from '@/middleware/validationHandler';
import { movieCreateSchema, movieUpdateSchema } from '@full-stack-interview/types'

const movieRouter = express.Router();

movieRouter.post(
    '/',
    validate(movieCreateSchema),
    movie.create
);
movieRouter.get('/', movie.listMovies);
movieRouter.get('/:id', movie.get);
movieRouter.patch(
    '/:id',
    validate(movieUpdateSchema),
    movie.update
);
movieRouter.delete('/:id', movie.delete);

export { movieRouter };