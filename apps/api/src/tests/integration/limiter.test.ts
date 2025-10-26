import request from 'supertest';
import { describe, it, expect } from 'vitest';
import express from 'express';
import { limiter } from '@/middleware/rateLimiting';

describe('Rate Limiter', () => {
  const app = express();

  var sample_route = "/health/live"
  // Apply the rate limiter middleware
  app.use(limiter);

  // Sample route
  app.get(sample_route, (req, res) => res.json({ ok: true }));

  it('should allow requests under the limit', async () => {
    for (let i = 0; i < 5; i++) {
      const res = await request(app).get(sample_route);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ok: true });
    }
  });

  it('should block requests exceeding the limit', async () => {
    // Send requests equal to the limit
    for (let i = 0; i < 100; i++) {
      await request(app).get(sample_route);
    }

    // 101st request should be blocked
    const res = await request(app).get(sample_route);
    expect(res.status).toBe(429);
    expect(res.body).toEqual({ error: 'Too many requests, please try again later.' });
  });
});
