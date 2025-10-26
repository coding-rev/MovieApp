import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { createApp } from '@/app/createApp';
import { withTestContext } from '@/tests/testContext';

const app = createApp();

describe('Performance Benchmarks', () => {
  it('measures average and p95 API latency for GET /movies', async () => {
    await withTestContext(async () => {
      const iterations = 20;
      const responseTimes: number[] = [];

      for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        const res = await request(app).get('/api/movies?page=1&pageSize=10');
        const end = performance.now();

        responseTimes.push(end - start);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
      }

      const avg = responseTimes.reduce((a, b) => a + b, 0) / iterations;
      const sorted = [...responseTimes].sort((a, b) => a - b);
      const p95 = sorted[Math.floor(0.95 * sorted.length) - 1];

      console.log(`Average latency: ${avg.toFixed(2)} ms`);
      console.log(`P95 latency: ${p95.toFixed(2)} ms`);

      expect(avg).toBeLessThan(300);
      expect(p95).toBeLessThan(500);
    });
  });

  it('checks database query execution time for filtered movie lookup', async () => {
    await withTestContext(async (client) => {
      const start = performance.now();
      const result = await client.movie.findMany({
        where: { year: { gte: 2000, lte: 2010 } },
        take: 10,
      });
      const end = performance.now();

      const elapsed = end - start;
      console.log(`Query Execution Time: ${elapsed.toFixed(2)} ms`);
      expect(elapsed).toBeLessThan(100);
      expect(result.length).toBeLessThanOrEqual(10);
    });
  });

  it('tests concurrent throughput (10 parallel requests)', async () => {
    await withTestContext(async () => {
      const concurrency = 10;
      const start = performance.now();

      const responses = await Promise.all(
        Array.from({ length: concurrency }).map(() =>
          request(app).get('/api/movies?page=1&pageSize=5')
        )
      );

      const end = performance.now();
      const totalTime = end - start;
      const rps = concurrency / (totalTime / 1000); // requests per second

      console.log(`Completed ${concurrency} requests in ${totalTime.toFixed(2)} ms`);
      console.log(`Throughput: ${rps.toFixed(2)} req/sec`);

      responses.forEach((res) => {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
      });

      expect(rps).toBeGreaterThan(5); // baseline throughput
    });
  });

  it('validates response payload size and structure', async () => {
    await withTestContext(async () => {
      const res = await request(app).get('/api/movies?page=1&pageSize=10');
      expect(res.status).toBe(200);

      const payloadSize = Buffer.byteLength(JSON.stringify(res.body));
      console.log(`Payload size: ${(payloadSize / 1024).toFixed(2)} KB`);

      // Ensure response shape
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('page');
      expect(res.body).toHaveProperty('pageSize');
      expect(res.body).toHaveProperty('total');
      expect(res.body).toHaveProperty('totalPages');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(payloadSize).toBeLessThan(50 * 1024); // <50KB baseline
    });
  });

  it('ensures consistent data structure across multiple requests', async () => {
    await withTestContext(async () => {
      const responses = await Promise.all([
        request(app).get('/api/movies?page=1&pageSize=5'),
        request(app).get('/api/movies?page=1&pageSize=5'),
      ]);

      const keys1 = Object.keys(responses[0].body.data[0] || {});
      const keys2 = Object.keys(responses[1].body.data[0] || {});
      const consistent = JSON.stringify(keys1.sort()) === JSON.stringify(keys2.sort());

      console.log(`🔁 Response shape consistent: ${consistent}`);
      expect(consistent).toBe(true);
    });
  });
});
