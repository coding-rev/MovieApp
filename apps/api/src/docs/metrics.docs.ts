/**
 * @swagger
 * tags:
 *   name: Metrics
 *   description: Application metrics and monitoring endpoints
 */

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Get application metrics
 *     tags: [Metrics]
 *     description: Exposes metrics for monitoring (e.g., Prometheus format) to track performance, usage, and health.
 *     responses:
 *       200:
 *         description: Metrics retrieved successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: |
 *                 # HELP http_requests_total The total number of HTTP requests
 *                 # TYPE http_requests_total counter
 *                 http_requests_total{method="get",route="/metrics"} 42
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve metrics
 */
