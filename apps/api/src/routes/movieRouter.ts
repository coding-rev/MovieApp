import express from 'express';
import { prisma } from '@/db/client';
import { movie } from '@/controllers/movieController';

const movieRouter = express.Router();

movieRouter.get('/movies', movie.listMovies);
movieRouter.get('/genres', movie.listGenres)

export { movieRouter };