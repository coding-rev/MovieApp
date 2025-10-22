import request from 'supertest';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { prisma } from '@/db/client';
import { createApp } from '@/app/createApp';

const app = createApp();

describe('Health / Readiness', () => {
  beforeAll(async () => await prisma.$connect());
  afterAll(async () => await prisma.$disconnect());

  it('GET /health -> should return 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.data).toBe('ok');
  });
});
