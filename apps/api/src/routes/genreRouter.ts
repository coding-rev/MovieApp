import express from 'express';
import { genre } from '@/controllers/genreController';

const genreRouter = express.Router();

genreRouter.get('/genres', genre.listGenres)

export { genreRouter };