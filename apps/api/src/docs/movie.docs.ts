/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management and retrieval
 *
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "ckxabc123xyz"
 *         title:
 *           type: string
 *           example: "Inception"
 *         year:
 *           type: integer
 *           example: 2010
 *         genre:
 *           type: string
 *           example: "Sci-Fi"
 *         rating:
 *           type: number
 *           example: 8.8
 *         thumbnail:
 *           type: string
 *           example: "https://example.com/inception.jpg"
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     description: Retrieve all movies with filters, sorting, and pagination.
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: minRating
 *         schema: { type: number, example: 7.5 }
 *       - in: query
 *         name: minYear
 *         schema: { type: integer, example: 2000 }
 *       - in: query
 *         name: maxYear
 *         schema: { type: integer, example: 2020 }
 *       - in: query
 *         name: genre
 *         schema: { type: string, example: "Action" }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [title, year, rating], example: rating }
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [asc, desc], example: desc }
 *       - in: query
 *         name: page
 *         schema: { type: integer, example: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, example: 10 }
 *     responses:
 *       200:
 *         description: List of movies with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total: { type: integer, example: 125 }
 *                 totalPages: { type: integer, example: 13 }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a single movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404: { description: Movie not found }
 */

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created successfully
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   patch:
 *     summary: Update a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200: { description: Updated successfully }
 *       404: { description: Movie not found }
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted successfully }
 *       404: { description: Movie not found }
 */
