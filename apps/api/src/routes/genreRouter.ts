import express from 'express';
import { genre } from '@/controllers/index';

const genreRouter = express.Router();

genreRouter.get('/genres', genre.listGenres)

export { genreRouter };