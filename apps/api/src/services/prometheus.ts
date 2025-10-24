import express from 'express';
import client from 'prom-client';

const register = new client.Registry();

// Collect default NodeJS metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });


// Counter for total HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpRequestCounter);

// Histogram for request latency
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
});
register.registerMetric(httpRequestDuration);

// Counter for errors
const httpErrorCounter = new client.Counter({
  name: 'http_errors_total',
  help: 'Total number of HTTP errors',
  labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpErrorCounter);

// Middleware to collect metrics
export const metricsMiddleware: express.RequestHandler = (req, res, next) => {
  const end = httpRequestDuration.startTimer({ method: req.method, route: req.path });

  res.on('finish', () => {
    const labels = { method: req.method, route: req.path, status: res.statusCode.toString() };
    httpRequestCounter.inc(labels);
    end({ status: res.statusCode.toString() });

    if (res.statusCode >= 400) {
      httpErrorCounter.inc(labels);
    }
  });
  next();
};

// Metrics endpoint handler
export const metricsHandler: express.RequestHandler = async ( req, res) => {
  console.log("I was here some");
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics())
}


