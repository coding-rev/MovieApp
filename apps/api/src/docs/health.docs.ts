/**
 * @swagger
 * tags:
 *   name: Health
 *   description: API health check endpoints
 */

/**
 * @swagger
 * /api/health/live:
 *   get:
 *     summary: Check if the service is alive
 *     tags: [Health]
 *     description: Returns a simple OK response if the service is up.
 *     responses:
 *       200:
 *         description: Service is alive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: live
 */

/**
 * @swagger
 * /api/health/ready:
 *   get:
 *     summary: Check if the service is ready
 *     tags: [Health]
 *     description: Checks dependencies like database connections and readiness.
 *     responses:
 *       200:
 *         description: Service is ready
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ready
 *       503:
 *         description: Service is not ready
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: not ready
 */
