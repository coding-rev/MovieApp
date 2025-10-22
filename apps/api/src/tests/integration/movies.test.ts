import request from 'supertest';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { prisma } from '@/db/client';
import { withTestContext } from '@/tests/testContext';
import { createMovie } from '@/services/index';
import { createApp } from '@/app/createApp';

const app = createApp(); 

describe('Integration Tests - Movie API', () => {
  beforeAll(async () => await prisma.$connect());
  afterAll(async () => await prisma.$disconnect());

  it('POST /api/movies -> should create a movie', async () => {
    await withTestContext(async () => {
      const res = await request(app)
        .post('/api/movies')
        .send({ title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 9 });
      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe('Inception');
    });
  });

  it('GET /api/movies -> should list movies', async () => {
    await withTestContext(async () => {
      await createMovie({ title: 'Matrix', year: 1999, genre: 'Action', rating: 8.7 });
      const res = await request(app).get('/api/movies');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  it('PUT /api/movies/:id -> should update a movie', async () => {
    await withTestContext(async () => {
      const movie = await createMovie({ title: 'Avatar', year: 2009, genre: 'Sci-Fi', rating: 8 });
      const res = await request(app)
        .put(`/api/movies/${movie.id}`)
        .send({ rating: 8.5 });
      expect(res.status).toBe(200);
      expect(res.body.data.rating).toBe(8.5);
    });
  });

  it('DELETE /api/movies/:id -> should delete a movie', async () => {
    await withTestContext(async () => {
      const movie = await createMovie({ title: 'Titanic', year: 1997, genre: 'Romance', rating: 7.8 });
      const res = await request(app).delete(`/api/movies/${movie.id}`);
      expect(res.status).toBe(204);
    });
  });
});
