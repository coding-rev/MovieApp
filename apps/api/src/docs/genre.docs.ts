/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Movie genres management and retrieval
 */

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Get all available movie genres
 *     tags: [Genres]
 *     description: Retrieves a list of all distinct movie genres available in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Action", "Drama", "Comedy", "Sci-Fi", "Thriller"]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch genres
 */
