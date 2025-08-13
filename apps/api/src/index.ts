import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PaginationQuerySchema } from "@full-stack-interview/types";

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/movies", async (req, res) => {
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

app.get("/api/genres", async (_req, res) => {
  const genres = await prisma.movie.findMany({
    select: { genre: true },
    distinct: ["genre"]
  });
  res.json(genres.map((g) => g.genre).sort());
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
