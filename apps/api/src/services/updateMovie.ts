import { prisma } from "@/db/client";
import type { Movie } from '@prisma/client';

export async function updateMovie(id: string, data: Partial<Movie>): Promise<Movie> {
  return prisma.movie.update({ where: { id }, data });
}
