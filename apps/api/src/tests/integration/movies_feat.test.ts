import request from 'supertest';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { prisma } from '@/db/client';
import { withTestContext } from '@/tests/testContext';
import { createMovie } from '@/services/index';
import { createApp } from '@/app/createApp';

const app = createApp();

describe('Integration Tests - Movie API with Filters/Sorting/Pagination', () => {
  beforeAll(async () => await prisma.$connect());
  afterAll(async () => await prisma.$disconnect());

  it('GET /api/movies -> should list movies with filters, sorting, pagination', async () => {
    await withTestContext(async () => {
      // Seed some movies
      await createMovie({ title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 9, thumbnail: null });
      await createMovie({ title: 'Matrix', year: 1999, genre: 'Action', rating: 8.7, thumbnail: null });
      await createMovie({ title: 'Avatar', year: 2009, genre: 'Sci-Fi', rating: 8, thumbnail: null });
      await createMovie({ title: 'Titanic', year: 1997, genre: 'Romance', rating: 7.8, thumbnail: null });

      // 1️⃣ Filter: minRating=8.5
      let res = await request(app)
        .get('/api/movies')
        .query({ minRating: 8.5 });
      expect(res.status).toBe(200);
      expect(res.body.data.every((m: any) => m.rating >= 8.5)).toBe(true);

      // 2️⃣ Filter: minYear=2000, maxYear=2010
      res = await request(app)
        .get('/api/movies')
        .query({ minYear: 2000, maxYear: 2010 });
      expect(res.status).toBe(200);
      expect(res.body.data.every((m: any) => m.year >= 2000 && m.year <= 2010)).toBe(true);

      // 3️⃣ Filter: genre='Sci-Fi'
      res = await request(app)
        .get('/api/movies')
        .query({ genre: 'Sci-Fi' });
      expect(res.status).toBe(200);
      expect(res.body.data.every((m: any) => m.genre === 'Sci-Fi')).toBe(true);

      // 4️⃣ Sorting: sortBy=rating, order=desc
      res = await request(app)
        .get('/api/movies')
        .query({ sortBy: 'rating', order: 'desc' });
      expect(res.status).toBe(200);
      const ratings = res.body.data.map((m: any) => m.rating);
      const sortedRatings = [...ratings].sort((a, b) => b - a);
      expect(ratings).toEqual(sortedRatings);

      // 5️⃣ Pagination: page=1, pageSize=2
      res = await request(app)
        .get('/api/movies')
        .query({ page: 1, pageSize: 2 });
      expect(res.status).toBe(200);
      expect(res.body.total).toBeGreaterThan(0);
      expect(res.body.totalPages).toBeGreaterThan(0);
      expect(res.body.data.length).toBeLessThanOrEqual(2);
    });
  });
});
