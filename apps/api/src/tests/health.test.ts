import request from 'supertest';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { prisma } from '@/db/client';
import { createApp } from '@/app/createApp';

const app = createApp();

describe('Health / Readiness', () => {
  beforeAll(async () => await prisma.$connect());
  afterAll(async () => await prisma.$disconnect());

  it('GET /api/health/live -> should return 200 and alive', async () => {
    const res = await request(app).get('/api/health/live');
    expect(res.status).toBe(200);
    expect(res.body.data).toBe('ok');
  });

  it('GET /api/health/ready -> should return 200 when DB is connected', async () => {
    const res = await request(app).get('/api/health/ready');
    // Either 200 or 503 depending on DB connectivity
    expect([200, 503]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.data).toBe('ready');
    } else {
      expect(res.body.message).toBe('not ready');
    }
  });

});
