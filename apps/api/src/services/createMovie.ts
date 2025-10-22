import { prisma } from "@/db/client";
import type { Movie } from '@prisma/client';

export async function createMovie(data: Omit<Movie, 'id'>): Promise<Movie> {
  return prisma.movie.create({ data });
}
