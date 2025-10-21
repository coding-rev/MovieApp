import express from 'express';
import { prisma } from '@/db/client';
import { PaginationQuerySchema } from "@full-stack-interview/types";

const movieRouter = express.Router();

movieRouter.get("/movies", async (req, res) => {
    const parseResult = PaginationQuerySchema.safeParse(req.query);
    if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid query", details: parseResult.error.flatten() });
    }
    const { q, page, pageSize } = parseResult.data;
    const where = q
        ? { title: { contains: q, mode: "insensitive" as const } }
        : undefined;

    const movies = await prisma.movie.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { title: "asc" }
    });

    res.json({ data: movies, page, pageSize });
});

movieRouter.get("/genres", async (_req, res) => {
    const genres = await prisma.movie.findMany({
        select: { genre: true },
        distinct: ["genre"]
    });
    res.json(genres.map((g) => g.genre).sort());
});

export { movieRouter };