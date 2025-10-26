import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { prisma } from '@/db/client'
import { withTestContext } from '@/tests/testContext';
import { createMovie, listMovies, updateMovie, deleteMovie } from '@/services/index';
import { PaginationQuerySchema } from "@full-stack-interview/types";


describe('Unit Tests - Movie Services', () => {
  beforeAll(async () => await prisma.$connect());
  afterAll(async () => await prisma.$disconnect());

  it('should create a movie', async () => {
    await withTestContext(async () => {
      const movie = await createMovie({ title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 9, thumbnail: null});
      expect(movie.id).toBeDefined();
      expect(movie.title).toBe('Inception');
    });
  });

  it('should list movies', async () => {
    await withTestContext(async () => {
      await createMovie({ title: 'Matrix', year: 1999, genre: 'Action', rating: 8.7, thumbnail: null });
      const parseResult = PaginationQuerySchema.safeParse({ page: "1", pageSize: "10" });
      const params = parseResult.data;
      const res = await listMovies(params);
      expect(res.movies.length).toBeGreaterThan(0);
    });
  });

  it('should update a movie', async () => {
    await withTestContext(async () => {
      const movie = await createMovie({ title: 'Avatar', year: 2009, genre: 'Sci-Fi', rating: 8, thumbnail: null });
      const updated = await updateMovie(movie.id, { rating: 8.5 });
      expect(updated.rating).toBe(8.5);
    });
  });

  it('should delete a movie', async () => {
    await withTestContext(async () => {
      const movie = await createMovie({ title: 'Titanic', year: 1997, genre: 'Romance', rating: 7.8, thumbnail: null });
      await deleteMovie(movie.id);
      const found = await prisma.movie.findUnique({ where: { id: movie.id } });
      expect(found).toBeNull();
    });
  });
});
